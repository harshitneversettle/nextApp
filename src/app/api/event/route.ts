import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { refreshAccess } from "@/lib/refresh";
import { refreshtoken } from "../refresh/route";

export async function POST(req: NextRequest) {
  try {
    const { eventName, eventDescription, message } = await req.json();
    const cookie = await cookies();
    let accessToken;
    try {
      accessToken = cookie.get("accessToken")?.value;
      const decoded = jwt.verify(accessToken!, process.env.ACCESS_SECRET!) as {
        id: number;
        email: string;
      };

      let adminEmail = decoded.email;

      if (!eventName || !eventDescription || !message) {
        return NextResponse.json(
          {
            message: "All fields are required",
            type: "error",
          },
          { status: 400 },
        );
      }

      const isExist = await db.events.findFirst({ where: { eventName } });

      if (isExist) {
        return NextResponse.json(
          {
            message: "A event already associated with this Event name",
            type: "error",
          },
          { status: 403 },
        );
      }
      await db.events.create({
        data: {
          eventName,
          eventDesc: eventDescription,
          message,
          admin: { connect: { email: adminEmail } },
        },
      });

      return NextResponse.json(
        {
          message: "Event registered successfully",
          type: "success",
        },
        { status: 201 },
      );
    } catch (error) {
      if (error instanceof (jwt.JsonWebTokenError || jwt.TokenExpiredError)) {
        refreshtoken();
        accessToken = cookie.get("accessToken")?.value;
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        type: "error",
      },
      { status: 500 },
    );
  }
}
