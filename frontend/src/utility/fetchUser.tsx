import axiosInstance from "../api/axios";
import useUserStore from "../store/user";
const fechUser = async () => {
  try {
    const user = await axiosInstance.get("/auth/me");
    if (user.data) {
      useUserStore.setState({ user: user.data.user });
    }
  } catch (err) {
    console.log(err);
    useUserStore.setState({ user: null });
  }
};

export default fechUser;
