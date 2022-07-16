import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import { getAuth, getCookie } from "../utils/common";
import globals, { apiUsers } from "../utils/globals";
import axios from "axios";

const drawerWidth = 240;

export default function CustomAppBar({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [identity] = React.useState(getCookie(globals.appToken));
  const [navItems, setNavItems] = React.useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    let tempNavItems = [];
    const getReady = async () => {
      let isEditor = false;
      let isAdmin = false;

      if (identity) {
        await axios.get(`${apiUsers}/me`, getAuth()).then((data) => {
          const user = data.data;
          if (user) {
            isEditor = user.isEditor;
            isAdmin = user.isAdmin;
          }
        });
      }

      tempNavItems = ["Home", "Admin", "Editor", "SignIn"];

      if (identity) {
        // change signin link to signout
        const indexOfSignIn = tempNavItems.findIndex(
          (navItem) => navItem === "SignIn"
        );
        tempNavItems[indexOfSignIn] = "SignOut";
      }

      if (!isEditor) {
        // hide editor link from nav
        const indexOfEditor = tempNavItems.findIndex(
          (navItem) => navItem === "Editor"
        );
        tempNavItems.splice(indexOfEditor, 1);
      }

      if (!isAdmin) {
        // hide admin link from nav
        const indexOfAdmin = tempNavItems.findIndex(
          (navItem) => navItem === "Admin"
        );
        tempNavItems.splice(indexOfAdmin, 1);
      }
      setNavItems(tempNavItems);
    };
    getReady();
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Derana News
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item} href={`/${item}`} variant="body2">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ backgroundColor: "#C7161E" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={require("../resources/images/logo.jpeg")}
            alt={"logo"}
            height={36}
            width={36}
            loading="lazy"
          />
          <Typography
            variant="h6"
            component="div"
            marginLeft={1}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Derana News
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link key={item} href={`/${item}`} variant="body2">
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {children}
    </Box>
  );
}
