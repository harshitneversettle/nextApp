import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { adminId, eventName } = await req.json();
  console.log(adminId, eventName);

  if (!eventName || !eventName) {
    return NextResponse.json(
      {
        message: "error",
        type: "error",
        data: {},
      },
      { status: 401 },
    );
  }

  const eventId = await db.events.findFirst({
    where: { adminId: Number(adminId), eventName: eventName },
    select: { id: true },
  });

  if (!eventId) {
    return NextResponse.json(
      {
        message: "no events found",
        type: "error",
        data: {},
      },
      { status: 401 },
    );
  }

  const allReviews = await db.users.findMany({
    where: { eventId: eventId.id },
    select: {
      name: true,
      email: true,
      eventId: true,
      reviews: { select: { review: true, stars: true, id: true } },
    },
  });

  return NextResponse.json({
    message: "success",
    type: "success",
    data: { allReviews },
  });
}
