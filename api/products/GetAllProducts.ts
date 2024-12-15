import { apiCaller } from "../../lib/axios";
import { RunAxiosAsync } from "../../lib/runAxios";

type SuccessResponse = {
  data: {
    products: {
      id: string;
      name: string;
      owner: string;
      price: number;
      purchasing_date: null | string; // Assuming purchasing_date can be null or a string
      images: string[];
      thumbnail: string;
      description: string;
      category: string;
      createdAt: string;
      updatedAt: string;
    }[];
    message: string;
  };
};
export const GETALLPRODUCTS = async () => {
  const response = await RunAxiosAsync<SuccessResponse>(
    apiCaller.get("products/")
  );
  return response;
};
