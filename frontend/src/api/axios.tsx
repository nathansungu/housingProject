import axios from "axios";
import refreshToken from "../middleware/refreshToken";
import useUserStore from "../store/user";


const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * RESPONSE INTERCEPTOR
 * - Handles 401 errors
 * - Refreshes token
 * - Retries original request
 * - Updates user store
 * - Redirects to login if refresh fails
 * 
 */
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If 401 error AND request has not been retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        refreshToken();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        //store current location for redirect after login
        const currentLocation =
          window.location.pathname + window.location.search;
        localStorage.setItem("redirectAfterLogin", currentLocation);  
        useUserStore.setState({ user: null });
        window.location.href = '/login';
        return;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
