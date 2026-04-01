import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function auth(Req : NextResponse){
    const cookie = await cookies() ;
    const accessToken = cookie.get("accessToken")?.value;
    if(!accessToken)
}