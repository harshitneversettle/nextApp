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
        },
        { status: 400 },
      );
    }

    const isExist = await db.admin.findFirst({ where: { email } });

    if (isExist) {
      return NextResponse.json(
        {
          message: "A account already associated with this email",
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
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
