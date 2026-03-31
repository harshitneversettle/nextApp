import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { eventName, eventDescription, message } = await req.json();
    const cookie = await cookies();
    

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

    // const adminEmail = cookie.get("email")?.value;
    const adminEmail = "harshityadav5499@gmail.com";

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
