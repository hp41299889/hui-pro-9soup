import { Response } from "@/util/server";
import { nextApi } from "./request";
import { Order, Prisma, Product } from "@prisma/client";

export const postOrder = async (
  storeId: number,
  payload: { items: Prisma.OrderItemCreateManyOrderInput[] }
) => {
  return nextApi.post<Response<Order>>(`/order/store/${storeId}`, payload);
};

export const getProduct = async () => {
  return nextApi.get<Response<Product[]>>("/product");
};
