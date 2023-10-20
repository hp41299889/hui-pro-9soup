import { NextRequest } from "next/server";
import { createProduct, readProduct } from "./repo";
import { Prisma } from "@prisma/client";
import { apiErrorHandler, apiResponse, response } from "@/util/server";

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  try {
    const payload: Prisma.ProductCreateInput = await req.json();
    const result = await createProduct(payload);
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "create product success",
      data: result,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};

export const GET = async () => {
  const r = { ...response };
  try {
    const result = await readProduct();
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "read product success",
      data: result,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};
