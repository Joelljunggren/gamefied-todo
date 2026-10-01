"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
  const description = formData.get("description") as string;
  const estimatedTime = Number(formData.get("estimatedTime"));
  const difficulty = formData.get("difficulty") as "EASY" | "MEDIUM" | "HARD";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daily = await prisma.daily.upsert({
    where: {
      date: today,
    },
    update: {},
    create: {
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
          id: daily.id,
        },
      },
    },
  });
  revalidatePath("/");
  console.log("Created todo:", todo);
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}

export async function updateTodo(
  id: number,
  description: string,
  estimatedTime: number,
  difficulty: "EASY" | "MEDIUM" | "HARD",
) {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      description,
      estimatedTime,
      difficulty,
    },
  });
  revalidatePath("/");
}

//startTodo()

//pauseTodo()

//resumeTodo()

//completeTodo()
