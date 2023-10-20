import { prisma } from "@/util/server";
import { Prisma } from "@prisma/client";

export const createProduct = async (payload: Prisma.ProductCreateInput) => {
  try {
    return await prisma.product.create({
      data: payload,
    });
  } catch (err) {
    throw err;
  }
};

export const readProduct = async () => {
  try {
    return await prisma.product.findMany();
  } catch (err) {
    throw err;
  }
};
