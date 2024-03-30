import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

let client: PrismaClient;

export async function article(d1: D1Database, id: string) {
  await getPrisma(d1);

  return await client.archive.findFirst({ where: { id } });
}

export async function list(d1: D1Database) {
  await getPrisma(d1);

  return await client.archive.findMany();
}

export async function getPrisma(d1: D1Database) {
  if (!client) {
    client = new PrismaClient({ adapter: new PrismaD1(d1) });
  }

  return client;
}
