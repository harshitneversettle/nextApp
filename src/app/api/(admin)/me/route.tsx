import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = await cookies();
  const refreshToken = cookie.get("refreshToken")?.value;
  if (refreshToken) {
    return NextResponse.json(
      {
        message: "logged in",
      },
      { status: 201 },
    );
  } else {
    return NextResponse.json(
      {
        message: "logged out",
      },
      { status: 401 },
    );
  }
}
