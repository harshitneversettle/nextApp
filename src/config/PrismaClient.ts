import { PrismaClient } from "@prisma/client";

// this will save us from making several connections on every render 
declare global {
  var prismaConnection: PrismaClient | undefined;
}

export const db = global.prismaConnection ?? new PrismaClient();

if (process.env.Curr_mode === "dev") {
  global.prismaConnection = db;
}
