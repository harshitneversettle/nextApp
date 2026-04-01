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
    console.log(cookie);
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

      const adminId = matchAccess.id;
      const { eventName } = await params;

      const eventDetails = await db.events.findMany({
        where: { adminId: adminId, eventName },
      });

      if (!eventDetails) {
        return NextResponse.json(
          {
            message: "No details found",
            tip: "Did you created an event ?",
          },
          { status: 404 },
        );
      }
      console.log(eventDetails);
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
