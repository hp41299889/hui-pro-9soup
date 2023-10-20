import { prisma } from "@/util/server";
import { Prisma } from "@prisma/client";

export const createOrder = async (
  storeId: number,
  payload: Prisma.OrderItemCreateManyOrderInput[]
) => {
  try {
    return await prisma.order.create({
      data: {
        storeId: storeId,
        items: {
          create: payload,
        },
      },
    });
  } catch (err) {
    throw err;
  }
};

export const readOrder = async () => {
  try {
    return await prisma.order.findMany();
  } catch (err) {
    throw err;
  }
};

export const readOrderByStoreId = async (storeId: number) => {
  try {
    return await prisma.order.findMany({
      where: {
        storeId,
      },
      include: {
        store: {
          select: {
            name: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
};
