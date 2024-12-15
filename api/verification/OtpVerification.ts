import { apiCaller } from "../../lib/axios";
import { RunAxiosAsync } from "../../lib/runAxios";
import { Profile } from "../../types/types";

type SuccessFulUpdate = {
  user: Profile;
  message: string;
};
export const VerifyOtp = async (otp: string) => {
  const response = await RunAxiosAsync(
    apiCaller.patch<SuccessFulUpdate>("auth/verify/", {
      otp,
    })
  );
  return response;
};

export const ResendOtp = async () => {
  const response = await RunAxiosAsync(
    apiCaller.post<SuccessFulUpdate>("auth/requestverify/")
  );
  return response;
};
