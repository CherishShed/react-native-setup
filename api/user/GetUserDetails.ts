import { apiCaller } from "../../lib/axios";
import { RunAxiosAsync } from "../../lib/runAxios";
import { Profile } from "../../types/types";

type SuccessFulUpdate = {
  user: Profile;
  message: string;
};
export const GetUser = async () => {
  const response = await RunAxiosAsync(
    apiCaller.get<SuccessFulUpdate>("user/details/")
  );
  return response;
};
