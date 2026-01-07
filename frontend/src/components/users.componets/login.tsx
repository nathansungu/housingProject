import { Box, Button, Container } from "@mui/material";
import { useState} from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/joy";
import fechUser from "../../utility/fetchUser";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { identifier: string; password: string }) => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      fechUser();
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath, { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
      console.log("Login successful", data);

    },
    onError: (error: any) => {
      console.log("Login failed", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    },
  });


  return (
    <>
      <Container
        sx={{
          backgroundColor: "#f5f5f5",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 1,
            borderRadius: 2,
            boxShadow: 1,
            height: "60%",
            width: { xs: "90%", sm: "70%", md: "40%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            gap: 3,
          }}
        >
          <Typography
            sx={{
              color: "blue",
              fontSize: "1.5rem",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            Welcom on bord! login to continue.
          </Typography>
          <Box>
            <Typography paddingY={2}>Email</Typography>
            <input
              width={"60%"}
              type="email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </Box>
          <Box>
            <Typography paddingY={2}>Password</Typography>
            <input
              height={400}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          {error && <Typography>{error}</Typography>}
          <Box>
            <Button
              variant="contained"
              disabled={!identifier || !password || isPending}
              onClick={() => {
                mutate({ identifier, password });
              }}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
