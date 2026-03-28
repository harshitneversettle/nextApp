import { db } from "@/config/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  console.log(name);
  db.admin.create({
    data : {
      name ,
      email ,
      password
    }
  })
  return NextResponse.json({
    name 
  })
}
