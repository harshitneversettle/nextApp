import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

export async function refreshAccess(refreshToken: string) {
  try {
    const adminId = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as {
      id: number;
    };

    const adminDetails = await db.admin.findUnique({
      where: { id: adminId.id },
    });

    const adminEmail = adminDetails?.email;

    const dbRefresh = adminDetails?.refreshToken;

    if (dbRefresh !== refreshToken) {
      return null;
    }

    const newAccess = jwt.sign(
      {
        id: adminId.id,
        email: adminEmail,
      },
      process.env.ACCESS_SECRET!,
      { expiresIn: "30m" },
    );

    return newAccess;
  } catch (error) {
    return null;
  }
}
