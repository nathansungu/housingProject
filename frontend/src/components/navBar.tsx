import { Container, Typography, Button, Stack,  } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import DropDownMenu from "material-ui/DropDownMenu"
import MenuItems from "material-ui/MenuItem"
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
          <Typography sx={{  }}>Easy Housing</Typography>
        </Container>
        <Container
          sx={{
            textAlign: "center",
            flexDirection: "row",
          }}
        >
          <Button>
            <Typography sx={{}}>home</Typography>
          </Button>

          <Button>
            <Typography>houses</Typography>
          </Button>
          <Button>
            <Typography>about us</Typography>
          </Button>

          <Button>
            <Typography>profile</Typography>
            <DropDownMenu>
              <ArrowDropDown /> profile
              <MenuItems>
              <Button>
                update Profile
              </Button>
              <Button>
                change password
              </Button>
              <Button>
                logout
              </Button>
              </MenuItems>
            </DropDownMenu>
            

            
          </Button>
        </Container>
      </Stack>
    </>
  );
};
