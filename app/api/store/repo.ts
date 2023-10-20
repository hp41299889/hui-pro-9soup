import { prisma } from "@/util/server";
import { Prisma } from "@prisma/client";

export const createStore = async (payload: Prisma.StoreCreateInput) => {
  try {
    return await prisma.store.create({
      data: payload,
    });
  } catch (err) {
    throw err;
  }
};

export const readStore = async () => {
  try {
    return await prisma.store.findMany();
  } catch (err) {
    throw err;
  }
};
