import { Response } from "@/util/server";
import { nextApi } from "./request";
import { Order, OrderItem } from "@prisma/client";

interface OrderItemByStoreId extends OrderItem {
  product: {
    name: string;
  };
}

export interface OrderByStoreId extends Order {
  store: {
    name: string;
  };
  items: OrderItemByStoreId[];
}

export const getOrderByStoreId = async (storeId: number) => {
  return nextApi.get<Response<OrderByStoreId[]>>(`/order/store/${storeId}`);
};
