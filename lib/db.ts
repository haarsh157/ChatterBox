import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
// export const db = new PrismaClient();

// The globalThis.prisma is written because in production as we change the lines of code frequently so it initiates new prisma client everytime  (HOT RELOAD)


if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
