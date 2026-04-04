import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { adminId, eventName } = await req.json();
  // const allEvents = await db.events.findMany({
  //   where: { adminId: Number(adminId) },
  //   select: { eventName: true },
  // });

  const allReviews = await db.users.findMany({
    select: {
      name: true,
      email: true,
      eventId : true ,
      reviews: { select: { review: true, stars: true , id : true } },
    },
  });
  return NextResponse.json({
    message: "success",
    type: "success",
    data: { allReviews },
  });
}
