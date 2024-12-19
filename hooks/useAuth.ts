import { useDispatch } from "react-redux";
import { updateAuthState } from "../store/AuthStore";
import useApi from "./useApi";
import { LOGIN, SIGNOUT } from "../api/auth/authentication";
import { GetUser } from "../api/user/GetUserDetails";

type SuccessResponse<T> = {
  data: T;
  error: null;
};

type ErrorResponse<E> = {
  data: null;
  error: E;
};

const useAuth = () => {
  const dispatch = useDispatch();
  const { callApi } = useApi();
  const SignIn = async (username: string, password: string) => {
    const { data, error } = await LOGIN(username, password);
    return { data, error };
  };

  const SignUp = async (username: string, password: string) => {
    const { data, error } = await LOGIN(username, password);
    return { data, error };
  };

  const SignOut = async () => {
    const { data, error } = await callApi(SIGNOUT);
    return { data, error };
  };

  const GetLoggedInUser = async () => {
    const { data, error } = await callApi(GetUser);
    return { data, error };
  };
  return { SignIn, SignUp, SignOut, GetLoggedInUser };
};

export default useAuth;
