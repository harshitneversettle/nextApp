import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function auth(Req: NextResponse) {
  const cookie = await cookies();
  let accessToken;
  try {
    let accessToken = cookie.get("accessToken")?.value;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const refreshToken = cookie.get("accessToken")?.value;
      if (!refreshToken) {
        return NextResponse.json(
          {
            message: "Login again",
            type: "error",
          },
          { status: 401 },
        );
      }
      const response = await axios.post("/api/refresh");
      if (response.data.message == "done") {
        accessToken = response.data.newAccess;
      }
    } else {
      // unauthorized hai

      return NextResponse.json(
        {
          message: "unauthorized",
          type: "error",
        },
        { status: 401 },
      );
    }
  }

  // yaha tk i have the access token , for sure
  const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET!);
  
  return null ;
}
