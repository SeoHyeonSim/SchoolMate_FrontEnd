// prismadb.ts
import { PrismaClient } from "@prisma/client";

// Extend the globalThis type to include prisma
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
