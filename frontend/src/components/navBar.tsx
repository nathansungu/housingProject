import { Dropdown, Menu, MenuButton } from "@mui/joy";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  MenuItem,
  Alert,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import useUserStore from "../store/user";
import axiosInstance from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
axiosInstance;
export const NavBar = () => {
  const navigate = useNavigate()
  const { user } = useUserStore();
  const [message, setMessage] = useState("");

  const logout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status == 200) {
        setMessage("loged out succesfully");
      }
    } catch (error) {
      setMessage("failed to logout");
    }
  };

  return (
    <>
      {message && <Alert>{message}</Alert>}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#7f0000",
          boxShadow: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ height: 72 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="Logo"
                sx={{
                  width: { xs: 40, sm: 50 },
                  height: { xs: 40, sm: 50 },
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 3 }}
              alignItems="center"
              sx={{ display: { xs: "flex", md: "flex" } }}
            >
              {["Home", "Houses", "About Us"].map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}

              <Dropdown>
                <MenuButton
                  endDecorator={<ArrowDropDown />}
                  sx={{
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  Profile
                </MenuButton>

                <Menu>
                  <MenuItem onClick={()=>{"/profile"}}>My Profile</MenuItem>
                  <MenuItem onClick={()=>{navigate("/password")}}>password</MenuItem>
                  <MenuItem>
                    <MenuButton onClick={() => logout()}> logout</MenuButton>
                  </MenuItem>
                </Menu>
              </Dropdown>
            </Stack>

            <Typography
              sx={{
                color: "white",
                fontSize: "0.95rem",
                textTransform: "capitalize",
                display: { xs: "none", sm: "block" },
              }}
            >
              Welcome, {user?.firstName}
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
