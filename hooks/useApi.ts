import { useDispatch } from "react-redux";
import { updateAuthState } from "../store/AuthStore";

type SuccessResponse<T> = {
  data: T;
  error: null;
};

type ErrorResponse<E> = {
  data: null;
  error: E;
};

const useApi = () => {
  const dispatch = useDispatch();
  const callApi = async <T, P>(
    api: (params?: P) => Promise<
      | ErrorResponse<{
          message: string;
          status: number;
        }>
      | SuccessResponse<T>
    >,
    params: P | undefined = undefined
  ) => {
    if (params) {
      const { data, error } = await api(params);
      if (error) {
        if (error?.status === 401) {
          dispatch(updateAuthState({ loggedIn: false, profile: null }));
          return { data: null, error };
        }
      }
      return { data, error };
    } else {
      const { data, error } = await api();
      if (error) {
        if (error?.status === 401) {
          dispatch(updateAuthState({ loggedIn: false, profile: null }));
          return { data: null, error };
        }
      }
      return { data, error };
    }
  };

  return { callApi };
};

export default useApi;
