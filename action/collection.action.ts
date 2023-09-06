"use server";

import prisma from "@/lib/prisma";
import { CreateCollectionType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs";

export async function createCollection(data: CreateCollectionType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.collection.create({
    data: {
      userId: user.id,
      name: data.name,
      color: data.color,
    },
  });
}
