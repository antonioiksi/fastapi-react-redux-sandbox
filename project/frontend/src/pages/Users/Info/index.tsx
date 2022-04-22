import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getUserInfo } from "../../../utils/api/user";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import KeyIcon from "@mui/icons-material/Key";
import HomeIcon from "@mui/icons-material/Home";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
export default function Users() {
  const { state } = useLocation();
  const [info, setInfo] = useState({
    fullname: "load",
    password: "load",
    id: 1,
    address: "load",
    email: "load",
  });

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        // @ts-ignore
        const data = await getUserInfo(state.token);
        setInfo(data);
      } catch {}
    }
    fetchMyAPI();
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" component="div">
        User info
      </Typography>
      <Paper>
        <List>
          <ListItem>
            <ListItemIcon>
              <Grid3x3Icon />
            </ListItemIcon>
            <ListItemText primary={info.id} secondary="id" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={info.fullname} secondary="name" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary={info.password} secondary="password" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={info.address} secondary="address" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AlternateEmailIcon />
            </ListItemIcon>
            <ListItemText primary={info.email} secondary="email" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
