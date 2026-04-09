import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // console.log("hii");
  const body = await req.json();
  const userName = body.userName;
  const userEmail = body.userEmail;
  const stars = body.stars;
  const review = body.review;
  const adminId = body.adminId;
  const eventName = body.eventName;

  if (!userName || !userEmail || !stars || !review || !adminId || !eventName) {
    return NextResponse.json(
      {
        message: "all fields are required ",
        type: "error",
      },
      { status: 405 },
    );
  }

  const isExist = await db.users.findUnique({ where: { email: userEmail } });
  // console.log("aksndjschjsxhcb")
  console.log(isExist);
  if (isExist) {
    const userId = isExist.id;
    const reviewExist = await db.reviews.findFirst({
      where: { userId, eventName },
    });

    if (reviewExist) {
      return NextResponse.json(
        {
          message: "review already exists",
          type: "error",
        },
        { status: 409 },
      );
    }
  }

  const eventDetails = await db.events.findUnique({ where: { eventName } });
  if (eventDetails) {
    const eventId = Number(eventDetails.id);
    // const eventName = eventDetails.eventName ;
    const userDetails = await db.users.upsert({
      where: { email: userEmail },
      update: {},
      create: { name: userName, email: userEmail, eventId },
    });

    const userId = userDetails.id;
    await db.reviews.create({
      data: {
        stars,
        review,
        userId,
        eventName,
      },
    });
    return NextResponse.json(
      {
        message: "submitted ",
        type: "success",
      },
      { status: 201 },
    );
  }

  return NextResponse.json(
    {
      message: "event not found ",
      type: "error",
    },
    { status: 404 },
  );
}
