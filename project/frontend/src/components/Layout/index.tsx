import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { getPosts } from "../../utils/api/post";
import theme from "../../config/theme";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getUsers } from "../../utils/api/user";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Layout: FC = () => {
  let [message, setMessage] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setMessage((message = data));
    } catch (err) {
      setError(String(err));
    }
  };

  const loadPosts = async () => {
    try {
      const data = await getPosts(5, 0, "id");
      setMessage((message = data));
      console.log(message);
    } catch (err) {
      setError(String(err));
    }
  };

  const LogOuttheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#00fff0",
      },
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => {
                navigate("/dashboard", { replace: true });
              }}
            >
              Fastapi-jwt
            </Typography>
            <ThemeProvider theme={LogOuttheme}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ExitToAppIcon />}
                onClick={() => {
                  navigate("/", { replace: true });
                }}
              >
                Log Out
              </Button>
            </ThemeProvider>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" component="div" sx={{ ml: 5, flexGrow: 1 }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ThemeProvider theme={theme}>
          <List>
            <ListItemButton
              key="User"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              // onClick={loadUsers}
              onClick={() => {
                navigate("/dashboard/users", { replace: true });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountCircleIcon
                  sx={{ width: 56, height: 56 }}
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton
              key="Post"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                navigate("/dashboard/posts", { replace: true });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PostAddIcon sx={{ width: 56, height: 56 }} color="primary" />
              </ListItemIcon>
              <ListItemText primary="Posts" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </List>
        </ThemeProvider>
      </Drawer>
      <Box component="main" sx={{ p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};
