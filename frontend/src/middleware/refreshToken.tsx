import axiosInstance from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const refreshToken = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await axiosInstance.post("/auth/refresh");
        if (response) {
          console.log("Token refreshed", response.data);
          return true;
        } else {
          const currentLocation =
            window.location.pathname + window.location.search;
          localStorage.setItem("redirectAfterLogin", currentLocation);
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };
    refresh();
  }, []);
};

export default refreshToken;
