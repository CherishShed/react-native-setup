import { ProductType } from "@/types/types";
import { apiCaller } from "../../lib/axios";
import { RunAxiosAsync } from "../../lib/runAxios";

type SuccessResponse = {
  imageData: { url: string; signature: string; public_id: string }[];
  message: string;
};
export const UPLOADIMAGE = async (data?: FormData) => {
  const response = await RunAxiosAsync<SuccessResponse>(
    apiCaller.post("products/uploadImage", data)
  );
  return response;
};
