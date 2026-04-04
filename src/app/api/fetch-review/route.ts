import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { reviewId } = await req.json();
  console.log("akncknca", reviewId);
  const reviewDetails = await db.reviews.findFirst({
    where: { id: Number(reviewId) },
    select: {
      review: true,
      stars: true,
      user: { select: { name: true, email: true } },
    },
  });

  console.log(reviewDetails);

  return NextResponse.json(
    {
      message: "success",
      type: "success",
      data: reviewDetails,
    },
    { status: 200 },
  );
}
