import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import useUserStore from "../../store/user";
import { CardContent, Typography } from "@mui/joy";
import { Container, Box, Grid, Card, CardHeader } from "@mui/material";
import { House } from "@mui/icons-material";

// declare houses type
type House = {
  description: string;
  electricBill: boolean;
  id: string;
  landlordId: string;
  location: string;
  name: string;
  pricing: number;
  rentDeadline: string;
  roomType: string;
  roomsNumber: number;
  status: string;
  vacantUnits: number;
  waterBill: boolean;
  wifi: boolean;
};

const Dashboard = () => {
  const user = useUserStore().user;

  const [houses, setHouses] = useState<House[]>([]);
  const [fetchError, setFetchError] = useState("");
  const fetchHouses = async (url: string) => {
    try {
      const res = await axiosInstance.get(url);

      // convert object → array
      const housesArray = Array.isArray(res.data)
        ? res.data
        : Object.values(res.data);

      setHouses(housesArray as House[]);
    } catch (error) {
      setFetchError("Failed to fetch houses");
    }
  };

  useEffect(() => {
    if (user?.role !== "landlord") {
      fetchHouses("/houses");
    } else if (user?.role === "landlord") {
      fetchHouses(`/houses/${user.id}`);
    }
  }, [user]);
  console.log("Houses:", houses);

  return (
    <>
      <Container>
        <Box mt={2}>
          {fetchError && <Typography color="danger">{fetchError}</Typography>}
          <Grid container spacing={2} columns={12}>
            {houses.length === 0 ? (
              <Typography>No houses available.</Typography>
            ) : (
              houses.map((house: House) => (
                <Grid size={{ md: 4, xs: 12, sm: 6 }} key={house.id}>
                  <Card
                    key={house.id}
                    sx={{
                      border: "1px solid #ccc",
                      padding: 2,
                      marginBottom: 2,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <CardHeader
                        title={
                          <Typography sx={{ variant: "h6", fontWeight: 600 }}>
                            {house.name}
                          </Typography>
                        }
                        sx={{ px: 0, pb: 1 }}
                      />

                      {/* Description */}
                      <Typography
                        sx={{ variant: "body2", color:"text.secondary" }}
                       
                        mb={2}
                      >
                        {house.description}
                      </Typography>

                      {/* Details Grid */}
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                          rowGap: 1,
                          columnGap: 2,
                          mb: 2,
                        }}
                      >
                        <Typography sx={{ variant: "body2" }}>
                          <strong>Room Type:</strong> {house.roomType}
                        </Typography>

                        <Typography sx={{ variant: "body2" }}>
                          <strong>Vacant Units:</strong> {house.vacantUnits}
                        </Typography>

                        <Typography sx={{ variant: "body2" }}>
                          <strong>Location:</strong> {house.location}
                        </Typography>
                      </Box>

                      {/* Price */}
                      <Typography sx={{ variant: "h6", color: "primary", fontWeight: 700 }}>
                        Price: ${house.pricing}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
