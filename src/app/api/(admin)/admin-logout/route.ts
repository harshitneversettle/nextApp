import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookie = await cookies();
    cookie.delete("refreshToken");
    cookie.delete("accessToken");
    return NextResponse.json(
      {
        message: "logged out successfully",
        type: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server error",
        type: "error",
      },
      { status: 500 },
    );
  }
}
