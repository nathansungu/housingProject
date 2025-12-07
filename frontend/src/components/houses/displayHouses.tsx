//display houses components
import axiosInstance from "../../api/axios";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Container, Typography } from "@mui/joy";
import { green } from "@mui/material/colors";
export const HousesComponents = () => {
  const [houses, setHouses] = useState([]);
  const [message, setMessage] = useState("");
  const fetchHouses = async () => {
    const response = await axiosInstance.get("/houses");
    const { houses, message } = response.data!;

    setHouses(houses);
    setMessage(message);
  };
  useQuery({
    queryKey: ["houses"],
    queryFn: fetchHouses,
  });



  return <> 

  <Container sx={{height:20, color: green}}>
    <Typography level="h2" fontSize="xl4" sx={{ mb: 1 }}>   houses  </Typography>

  </Container>
  
  
  </>;
};
