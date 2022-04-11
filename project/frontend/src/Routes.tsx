import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useHistory } from 'react-router';
import { makeStyles } from "@material-ui/core/styles";

import { Home, Login } from "./views";
// import { Admin } from './admin';
// import { logout } from './utils/auth';

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: "center",
  },
  header: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
}));

export const Routs: FC = () => {
  const classes = useStyles();
  //   const history = useHistory();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
