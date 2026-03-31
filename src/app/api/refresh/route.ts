import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookie = await cookies();
    const refreshToken = cookie.get("refreshToken")?.value;

    if (!refreshToken) {
      // login again
      return NextResponse.json(
        {
          message: "login again",
          type: "error",
        },
        { status: 401 },
      );
    }

    const adminId = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as {
      id: number;
    };
    const adminEmail = (
      await db.admin.findUnique({ where: { id: adminId.id } })
    )?.email;

    const newAccess = jwt.sign(
      {
        id: adminId.id,
        email: adminEmail,
      },
      process.env.ACCESS_SECRET!,
      { expiresIn: "30m" },
    );

    cookie.delete("accessToken");

    cookie.set("accessToken", newAccess, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 30,
      sameSite: "strict",
    });

    return NextResponse.json({
      message: "done",
      type: "success",
      data: newAccess,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "login again",
        type: "error",
      },
      { status: 401 },
    );
  }
}
