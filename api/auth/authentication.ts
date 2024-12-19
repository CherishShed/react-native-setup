import { apiCaller } from "../../lib/axios";
import { RunAxiosAsync } from "../../lib/runAxios";
import { Profile } from "../../types/types";

type SuccessFulSignup = {
  user: Profile;
  message: string;
};
export const LOGIN = async (username: string, password: string) => {
  const response = await RunAxiosAsync<SuccessFulSignup>(
    apiCaller.post("auth/signin", {
      username,
      password,
    })
  );
  return response;
};

export const SIGNUP = async (username: string, password: string) => {
  const response = await RunAxiosAsync<SuccessFulSignup>(
    apiCaller.post("auth/signup", {
      username,
      password,
    })
  );
  return response;
};

export const SIGNOUT = async () => {
  const response = await RunAxiosAsync<SuccessFulSignup>(
    apiCaller.post("auth/signout")
  );
  return response;
};
