import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import customtheme from "./config/theme";

ReactDOM.render(
  <ThemeProvider theme={customtheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
