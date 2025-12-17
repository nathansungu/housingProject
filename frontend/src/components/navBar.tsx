import { Dropdown, Menu, MenuButton } from "@mui/joy";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

export const NavBar = () => {
  return (
    <>
      <Stack
        sx={{
          width: "100%",
          height: "10vh",
          backgroundColor: "#7f0000",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Container>
          <Box>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: "80px", height: "60px", borderRadius: "50%" }}

            />
          </Box>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button sx={{ color: "white" }}>home</Button>

          <Button sx={{ color: "white" }}>houses</Button>
          <Button sx={{ color: "white" }}>about us</Button>

          

          <Dropdown>
            <MenuButton endDecorator={<ArrowDropDown sx={{ color: "white" }} />}>
              <Typography fontWeight={300} color="white">Profile</Typography>
            </MenuButton>

            <Menu>
              <MenuItem>
                <Button>Add Task</Button>
              </MenuItem>
              <MenuItem>
                <Button>Trash</Button>
              </MenuItem>
              <MenuItem>
                <Button>Completed</Button>
              </MenuItem>
            </Menu>
          </Dropdown>
        </Container>
      </Stack>
    </>
  );
};
