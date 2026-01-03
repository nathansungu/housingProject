import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Box, Button, IconButton, Input, Snackbar, Typography, Alert, Container } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect } from "react";
const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [BackedError, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const {isPending, isSuccess, mutate} = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      const response = await axiosInstance.post("http://localhost:4000/api/auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: any) => {
      console.log(error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    if( isSuccess) {
      setOpen(true);
    }
  }, [isSuccess]);
  return (
    <
    >       
    <Container 
      sx={{
        backgroundImage:"url(/logo.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        height: "100vh",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }}
        margin="auto"
        marginTop="5px"
        padding={.5}
      >
        <Typography variant="h3" color={"blue"} >
          Register
        </Typography>
        <Snackbar
          open ={open}
          autoHideDuration={9000}
          onClose={() => setOpen(false)}
          
        >
              <Alert severity="success" variant="filled">
                Registration successful! Please login.
              </Alert>
        </Snackbar>
        <Box>
          <Typography>First Name</Typography>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>Last Name</Typography>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>Email</Typography>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>Password</Typography>
          <Input
          endAdornment={
              <IconButton
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>Confirm Password</Typography>
          <Input
            endAdornment={
              <IconButton
                onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
       
        {BackedError && <Typography color="red">{BackedError}</Typography>}
        <Box>
          <Button
            variant="contained"
           
            onClick={() => {
              if (!firstName || !lastName || !email || !password || !confirmPassword) {
                setError("Please fill in all fields");
                return;
              }
                          
              confirmPassword == password 
                ? mutate({ firstName, lastName, email, password, userName: email, confirmPassword })
                : setError("Passwords do not match");


            }}
            disabled={isPending || isDisabled}
            
              >
            {isPending ? "Registering..." : "Register"}
          </Button>

          <Button onClick={() => navigate("/login")}>I have an account</Button>
        </Box>
      </Box>
      </Container>
    </>
  );
};

export default Register;
