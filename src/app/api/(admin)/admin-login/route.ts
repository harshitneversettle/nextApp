import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
          type: "error",
        },
        { status: 400 },
      );
    }

    const adminDetails = await db.admin.findUnique({
      where: {
        email: email,
      },
    });

    console.log(adminDetails);

    if (!adminDetails) {
      return NextResponse.json(
        {
          message: "No user ia associated with this email",
          type: "error",
        },
        { status: 403 },
      );
    }
    const passCheck = await bcrypt.compare(password, adminDetails.password);

    if (!passCheck) {
      return NextResponse.json(
        {
          message: "email || password is wrong",
          type: "error",
        },
        { status: 403 },
      );
    }
    const accessToken = jwt.sign(
      {
        id: adminDetails.id,
        email: adminDetails.email,
      },
      process.env.ACCESS_SECRET!,
      { expiresIn: "30m" },
    );

    const refreshToken = jwt.sign(
      {
        id: adminDetails.id,
      },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" },
    );

    await db.admin.update({
      where: { email: adminDetails.email },
      data: { refreshToken },
    });

    const cookieSetting = await cookies();

    cookieSetting.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 30,
      sameSite: "strict",
    });
    cookieSetting.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return NextResponse.json(
      {
        message: "Logged in successfully",
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
