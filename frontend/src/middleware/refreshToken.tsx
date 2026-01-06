import axiosInstance from "../api/axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUserStore from "../store/user"

const refreshToken =()=>{
    const navigate = useNavigate();
    useEffect(() => {
        const refresh = async () => {
            try {
                const response = await axiosInstance.post('/auth/refresh');
                if(response){
                    console.log("Token refreshed", response.data);
                    return true 
                }else{
                    const currentLocation = window.location.pathname + window.location.search
                    localStorage.setItem('redirectAfterLogin', currentLocation)
                    navigate('/login', { replace: true })
                }

            } catch (error) {
                console.error('Error refreshing token:', error)
            }
        }
        refresh()
    }, [])

    useEffect(() => {
        const checkUser = async () => {
          try {
            const user = await axiosInstance.get('/auth/me');
            if (user.data) {
                useUserStore.setState({ user: user.data.user });             
            }
          } catch (err) {
            console.log(err);
            useUserStore.setState({ user: null });        
          }
        };
        checkUser();
      }, [navigate]);


}

export default refreshToken 