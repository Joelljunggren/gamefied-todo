"use server";
import { prisma } from "@/lib/prisma";

export async function createTodo(formData: FormData) {
  const description = formData.get("description") as string;
  const estimatedTime = Number(formData.get("estimatedTime"));
  const difficulty = formData.get("difficulty") as "EASY" | "MEDIUM" | "HARD";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daily = await prisma.daily.findUnique({
    where: {
      date: today,
    },
  });

  if (!daily) {
    throw new Error("No Daily found for today");
  }

  const todo = await prisma.todo.create({
    data: {
      description,
      estimatedTime,
      difficulty,
      daily: {
        connect: {
          id: daily.id,
        },
      },
    },
  });

  console.log("Created todo:", todo);
}
