import { AxiosError, AxiosResponse } from "axios";

type SuccessResponse<T> = {
  data: T;
  error: null;
};

type ErrorResponse<E> = {
  data: null;
  error: E;
};
export const RunAxiosAsync = async <T>(
  promise: Promise<AxiosResponse<T>>
): Promise<
  SuccessResponse<T> | ErrorResponse<{ message: string; status: number }>
> => {
  try {
    const res = await promise;
    return { data: res.data, error: null };
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      const res = error.response;
      if (res) {
        return {
          data: null,
          error: { message: res.data.message, status: res.status },
        };
      }
    }
    return {
      data: null,
      error: { message: (error as any).message, status: (error as any).status },
    };
  }
};
