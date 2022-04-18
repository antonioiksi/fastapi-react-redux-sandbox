import React from "react";
import { Component } from "react";
// import Image from "../../../public/page_not_found.jpg";
import { Paper } from "@mui/material";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
  },
};

class PageNotFound extends Component {
  render() {
    return <Paper style={styles.paperContainer}>PageNotFound</Paper>;
  }
}

export default PageNotFound;
