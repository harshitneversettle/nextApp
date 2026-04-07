import { NextRequest, NextResponse } from "next/server";
import { auth } from "./middlewares/auth.middleware";

export async function middleware(req: NextRequest) {
  const allMiddlewares = [auth];

  for (let i of allMiddlewares) {
    const result = await i(req);
    if (result === true || result === false || result === null) {
      return NextResponse.json(
        { message: "unauthorized", type: "error" },
        { status: 401 },
      );
    }
    if (result instanceof NextResponse) {
      return result;
    }
  }
  return NextResponse.next();
}

// boiler plate
export const config = {
  matcher: ["/api/event", "/api/event/:eventName"],
};
