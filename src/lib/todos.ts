import { prisma } from "./prisma";

export async function getTodos() {
  return await prisma.todo.findMany();
}
