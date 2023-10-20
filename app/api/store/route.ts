import { NextRequest } from "next/server";
import { createStore, readStore } from "./repo";
import { Prisma } from "@prisma/client";
import { apiErrorHandler, apiResponse, response } from "@/util/server";

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  try {
    const payload: Prisma.StoreCreateInput = await req.json();
    const result = await createStore(payload);
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "create store success",
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
    const result = await readStore();
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "read store success",
      data: result,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};
