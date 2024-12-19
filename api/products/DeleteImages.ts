import { ProductType } from "@/types/types";
import { apiCaller } from "../../lib/axios";
import { RunAxiosAsync } from "../../lib/runAxios";

type SuccessResponse = {
  success: boolean;
  message: string;
};
export const DELETEIMAGE = async (public_id?: string) => {
  const response = await RunAxiosAsync<SuccessResponse>(
    apiCaller.delete("products/uploadImage", { data: { public_id } })
  );
  return response;
};
