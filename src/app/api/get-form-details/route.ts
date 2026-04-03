import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Hello");
  try {
    // const { adminId, eventName } = await req.json();
    const { adminId, eventName } = await req.json();
    const adminIdNum = Number(adminId);
    // console.log(typeof adminId, eventName);
    const adminDetails = await db.admin.findUnique({
      where: { id: adminIdNum },
    });
    // console.log("accha", adminDetails);

    const adminEmail = adminDetails?.email;
    const adminName = adminDetails?.name;

    const eventDetails = await db.events.findFirst({
      where: { adminId: adminIdNum, eventName },
    });
    const eventDesc = eventDetails?.eventDesc;
    const eventMessage = eventDetails?.message;

    const toSend = {
      adminEmail,
      adminName,
      eventDesc,
      eventMessage,
    };
    // console.log(toSend);
    return NextResponse.json(
      {
        message: "successfully fetched",
        type: "success",
        data: toSend,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "error",
        type: "error",
        data: {},
      },
      { status: 404 },
    );
  }
}
