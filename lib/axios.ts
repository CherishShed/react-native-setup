import axios, { AxiosError } from "axios";

/*
    using this axios instance will help in checking for user, automatically routing to signin on unauthenticated error
*/

export const apiCaller = axios.create({
  timeout: 500000,
  baseURL: "http://127.0.0.1:8080/api/",
  headers: {},
  withCredentials: true,
});

// interceptors, to do shit before the request is amde or response is received
// apiCaller.interceptors.request.use(
//   (request) => {
//     const accessToken = localStorage.getItem("authToken");
//     if (accessToken) {
//       request.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

apiCaller.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if ((error as AxiosError).response?.status == 401) {
      console.log("unauthorized");
      //   try {
      //     const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the stored refresh token.
      //     // Make a request to your auth server to refresh the token.
      //     const response = await axios.post(
      //       "host/refresh",
      //       {
      //         refreshToken,
      //       },
      //       { headers: { Authorization: localStorage.getItem("authToken") } }
      //     );
      //     const { token: accessToken, refreshToken: newRefreshToken } =
      //       response.data.data.token;
      //     // Store the new access and refresh tokens.
      //     localStorage.setItem("authToken", accessToken);
      //     localStorage.setItem("refreshToken", newRefreshToken);
      //     // Update the authorization header with the new access token.
      //     apiCaller.defaults.headers.common[
      //       "Authorization"
      //     ] = `Bearer ${accessToken}`;
      //     return apiCaller(originalRequest); // Retry the original request with the new access token.
      //   } catch (refreshError) {
      //     // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
      //     console.error("Token refresh failed:", refreshError);
      //     return Promise.reject(refreshError);
      //   }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);
