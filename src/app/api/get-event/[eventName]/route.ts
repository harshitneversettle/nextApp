import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventName: string }> },
) {
  try {
    const cookie = await cookies();
    const fetchedAccess = cookie.get("accessToken")?.value;

    if (!fetchedAccess) {
      return NextResponse.json(
        {
          message: "unauthorized",
          type: "error",
        },
        { status: 401 },
      );
    }

    try {
      const matchAccess = jwt.verify(
        fetchedAccess,
        process.env.ACCESS_SECRET!,
      ) as { id: number; email: string };

      console.log(matchAccess);
      const adminId = matchAccess.id;
      const { eventName } = await params;
      // console.log(eventName);
      if (!eventName) {
        return NextResponse.json(
          {
            message: " try again",
            type: "error",
          },
          { status: 400 },
        );
      }
      const eventDetails = await db.events.findUnique({
        where: { adminId: adminId, eventName: eventName },
      });

      console.log(eventDetails);

      if (!eventDetails) {
        return NextResponse.json(
          {
            message: "No details found",
            tip: "Did you created an event ?",
          },
          { status: 404 },
        );
      }
      // console.log(eventDetails);
      return NextResponse.json(
        {
          message: "event successfully fetched",
          type: "success",
          data: eventDetails,
        },
        { status: 201 },
      );
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // means token is expired , refresh the token
        return NextResponse.json(
          { message: "Access token expired", type: "expired" },
          { status: 401 },
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "failed to fetch event",
        type: "error",
      },
      { status: 500 },
    );
  }
}
