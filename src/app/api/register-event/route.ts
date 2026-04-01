import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { refreshtoken } from "@/helpers/refreshToken";

export async function POST(req: NextRequest) {
  try {
    const { eventName, eventDescription, message } = await req.json();
    const cookie = await cookies();
    let accessToken;
    try {
      accessToken = cookie.get("accessToken")?.value;
      let decoded;
      try {
        decoded = jwt.verify(accessToken!, process.env.ACCESS_SECRET!) as {
          id: number;
          email: string;
        };
      } catch (error) {
        if (
          error instanceof jwt.JsonWebTokenError ||
          error instanceof jwt.TokenExpiredError
        ) {
          refreshtoken();
          accessToken = cookie.get("accessToken")?.value;
          try {
            decoded = jwt.verify(accessToken!, process.env.ACCESS_SECRET!) as {
              id: number;
              email: string;
            };
          } catch (error) {
            return NextResponse.json(
              {
                message: "unauthorized",
                type: "error",
              },
              { status: 401 },
            );
          }
        }
      }

      let adminEmail = decoded!.email;

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
          { status: 409 },
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
    } catch (error) {}
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
