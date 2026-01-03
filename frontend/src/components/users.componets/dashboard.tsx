import axiosInstance from "../../api/axios";
import { useEffect } from "react";

const Dashboard = ()=>{
    const fetchAllHouses = async ()=>{
        const houses = await axiosInstance.get('/houses')
        return houses.data
    }

    const fetchLandloardHouses = async ()=>{
        const houses = await axiosInstance.get(`/houses/${}`)
    }



    return (
        <>

        </>

    )
    
}

export default Dashboard;