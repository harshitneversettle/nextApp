import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventName: string }> },
) {
  try {
    const { eventName } = await params;
    console.log(eventName);
    const eventDetails = await db.events.findFirst({
      where: { eventName: eventName },
    });

    if (!eventDetails) {
      return NextResponse.json({
        message: "No details found",
        tip: "Did you created an event ?",
      });
    }
    console.log(eventDetails);
    return NextResponse.json({
      message: "event successfully fetched",
      type: "success",
      data: eventDetails,
    });
  } catch (error) {
    return NextResponse.json({
      message: "failed to fetch event",
      type: "error",
    });
  }
}
