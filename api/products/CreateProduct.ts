import { ProductType } from "@/types/types";
import { apiCaller } from "../../lib/axios";
import { RunAxiosAsync } from "../../lib/runAxios";

type SuccessResponse = {
  product: ProductType;
  message: string;
};
export const CREATEPRODUCT = async (data?: Partial<ProductType>) => {
  const response = await RunAxiosAsync<SuccessResponse>(
    apiCaller.post("products/", data)
  );
  return response;
};
