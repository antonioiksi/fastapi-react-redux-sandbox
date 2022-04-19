import React from "react";
import { Component } from "react";
import Image from "../../images/page_not_found.jpg";
import { Box, Paper, Typography } from "@mui/material";
import { CssBaseline } from "@material-ui/core";

const useStyles = {
  root: {
    padding: "8px",
    height: "100vh",
  },
  paper: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
  },
};

const mystyles = {
  position: "absolute",
  bottom: "50vh",
  width: "100%",
  color: "white",
} as React.CSSProperties;

class PageNotFound extends Component {
  render() {
    return (
      <div style={useStyles.root}>
        <CssBaseline />
        <Paper style={useStyles.paper}>
          <Box style={mystyles}>
            <Typography variant="h1" align="center" fontStyle="Arial">
              Page Not Found
            </Typography>
          </Box>
        </Paper>
      </div>
    );
  }
}

export default PageNotFound;
