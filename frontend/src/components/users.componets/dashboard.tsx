import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import useUserStore from "../../store/user";
import { Typography } from "@mui/joy";
import {Container,Box } from "@mui/material";
import { House } from "@mui/icons-material";

// declare houses type
type House = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
};

const Dashboard = () => {
  // get user details from useUserStore
  const user = useUserStore().user;
  
  const [houses, setHouses] = useState<House[]>([]);
  const [fetchError, setFetchError] = useState("");
  const fetchAllHouses = async () => {
    const allHouses = await axiosInstance.get("/houses");
    console.log(allHouses)
    if (allHouses.data) {
      setHouses(allHouses.data);
      console.log(houses)
    } else {
      setFetchError("Failed to fetch houses");
    }

    return allHouses.data;
  };

  const fetchLandloardHouses = async (id: string) => {
    const allHouses = await axiosInstance.get(`/houses/${id}`);
    console.log(allHouses.data)
    if (allHouses.data) {

      setHouses(allHouses.data);
      console.log(houses)
    } else {
      setFetchError("Failed to fetch houses");
    }

    return allHouses.data;
  };

  useEffect(() => {
    if (user?.role !== "landlord") {
      fetchAllHouses();
    } else if (user?.role === "landlord") {
      fetchLandloardHouses(user.id);
    }
  }, [user]);

  // console.log("houses state", houses);

  return (
    <>
      <Container>
        <Typography level="h2">
          Welcome, {user?.firstName} {user?.lastName}
        </Typography>

        

        {/* <Box>
          {fetchError && <Typography color="danger">{fetchError}</Typography>}
          <Typography level="h3">Available Houses:</Typography>
          
          {houses.length === 0 ? (
            <Typography>No houses available.</Typography>
          ) : (
            //  houses.map((house: House) => (
            //    <Box
            //      key={house.id}
            //      sx={{ border: "1px solid #ccc", padding: 2, marginBottom: 2 }}
            //    >
            //      <Typography level="h4">{house.title}</Typography>
            //      <Typography>{house.description}</Typography>
            //      <Typography>Location: {house.location}</Typography>
            //      <Typography>Price: ${house.price}</Typography>
            //    </Box>
          //  )
          //)
          )}
        </Box>  */}
      </Container>
    </>
  );
};

export default Dashboard;
