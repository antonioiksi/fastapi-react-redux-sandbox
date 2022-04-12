import { createTheme } from "@material-ui/core/styles";
const GeneralTheme = createTheme({
  palette: {
    primary: {
      main: "#03a9f4",
    },
    secondary: {
      main: "#00fff0",
    },
  },
  //   overrides: {
  //     MuiAppBar: {
  //       colorPrimary: {
  //         backgroundColor: "#00fff0",
  //       },
  //     },
  //   },
});
export default createTheme(GeneralTheme);
