import { apiCaller } from "../../lib/axios";
import { RunAxiosAsync } from "../../lib/runAxios";

type SuccessFulUpdate = {
  user: {
    username: string;
    id: string;
    first_name: string;
    last_name: string;
  };
  message: string;
};
export const UpdateUserDetails = async (
  first_name: string,
  last_name: string,
  date_of_birth: string
) => {
  const response = await RunAxiosAsync(
    apiCaller.patch<SuccessFulUpdate>("user/updateprofile/", {
      first_name,
      last_name,
      date_of_birth,
    })
  );
  return response;
};
