import { generateHash } from "@/helpers/generateHash";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
          type: "error",
        },
        { status: 400 },
      );
    }
    const isExist = await db.admin.findFirst({ where: { email } });

    if (isExist) {
      return NextResponse.json(
        {
          message: "A account already associated with this email",
          type: "error",
        },
        { status: 403 },
      );
    }

    const hashedPass = await generateHash(password);

    await db.admin.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
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

export async function GET(
  req: NextResponse,
  { params }: { params: { email: string } },
) {
  const userDetails = await db.admin.findFirst({
    where: { email: params.email },
  });

  if (!userDetails) {
    return NextResponse.json({
      message: "No details found",
      tip: "Did you registered yourself ?",
    });
  }

  return NextResponse.json({
    data: {
      userDetails,
    },
  });
}
