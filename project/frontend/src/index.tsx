import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import customtheme from "./config/theme";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import rootReducer from './reducers'

// const store = createStore(rootReducer)

ReactDOM.render(
  // <Provider store={store}>
  <ThemeProvider theme={customtheme}>
    <App />
  </ThemeProvider>,
  // </Provider>,
  document.getElementById("root")
);
