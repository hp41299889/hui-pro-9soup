import { NextRequest } from "next/server";
import { createOrder, readOrderByStoreId } from "../../repo";
import { Prisma } from "@prisma/client";
import { apiErrorHandler, apiResponse, response } from "@/util/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const r = { ...response };
  const storeId = Number(params.id);
  try {
    const payload: { items: Prisma.OrderItemCreateManyOrderInput[] } =
      await req.json();
    console.log(payload);

    const result = await createOrder(storeId, payload.items);
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "create order success",
      data: result,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const r = { ...response };
  const storeId = Number(params.id);
  try {
    const result = await readOrderByStoreId(storeId);
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "read order success",
      data: result,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};
