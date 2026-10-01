"use server";

import { prisma } from "@/lib/prisma";

export async function createTodo(
  description: string,
  estimatedTime: number,
  difficulty: "EASY" | "MEDIUM" | "HARD",
) {
  const today = new Date();

  const daily = await prisma.daily.findUnique({
    where: {
      date: today,
    },
  });
  const todo = await prisma.todo.create({
    data: {
      description,
      estimatedTime,
      difficulty,
      daily: {
        connect: {
          id: daily?.id,
        },
      },
    },
  });
}
