import { cookies } from "next/headers";
import { refreshAccess } from "@/lib/refresh";

export async function refreshtoken() {
  try {
    const cookie = await cookies();
    const refreshToken = cookie.get("refreshToken")?.value;

    if (!refreshToken) {
      // login again
      return null;
    }

    const newAccess = await refreshAccess(refreshToken);
    if (newAccess === null) {
      return null;
    }

    cookie.set("accessToken", newAccess, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 30,
      sameSite: "strict",
    });
  } catch (error) {
    return null;
  }
}
