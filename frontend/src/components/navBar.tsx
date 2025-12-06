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
          <Typography sx={{ color: "white" }}>Easy Housing</Typography>
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

          <Button endIcon={<ArrowDropDown sx={{ color: "white" }} />}>
            <Typography sx={{ color: "white" }}>profile</Typography>
          </Button>

          <Dropdown>
            <MenuButton variant="plain" sx={{ color: "inherit", gap: 1 }}>
              <Box
                width="2rem"
                height="2rem"
                component="img"
                src="/to-do-list.png"
              />
              <Typography fontWeight={300}>TASKS</Typography>
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
