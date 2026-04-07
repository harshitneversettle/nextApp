import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { refreshAccess } from "@/lib/refresh";
import { NextRequest, NextResponse } from "next/server";

async function verify(adminEmail: string) {
  const adminDetails = await db.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!adminDetails) {
    return null;
  }

  return adminDetails;
}

export async function auth(req: NextRequest) {
  const cookie = await cookies();
  let accessToken;
  let decoded;
  try {
    accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return false;
    }

    decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET!) as {
      id: number;
      email: string;
    };

    const adminEmail = decoded.email;
    const result = await verify(adminEmail);
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      try {
        const refreshToken = cookie.get("refreshToken")?.value;
        if (!refreshToken) {
          return false;
        }
        const newAccess = await refreshAccess(refreshToken);
        if (newAccess === null) {
          return false;
        }
        accessToken = newAccess;
        decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET!) as {
          id: number;
          email: string;
        };
        const adminEmail = decoded.email;
        const result = await verify(adminEmail);
        if (!result) {
          return false;
        }
        const response = NextResponse.next();

        response.cookies.set("accessToken", newAccess, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 30,
          sameSite: "strict",
        });

        return response;
      } catch (error) {
        return false;
      }
    } else {
      // unauthorized hai
      return false;
    }
  }
}
