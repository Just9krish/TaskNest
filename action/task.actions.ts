"use server";

import prisma from "@/lib/prisma";
import { CreateTaskInput } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTask(data: CreateTaskInput) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { content, collectionId, expiresAt } = data;

  return prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
}
