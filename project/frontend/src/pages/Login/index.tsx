import React, { FC, useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Avatar, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import VpnKeySharpIcon from "@mui/icons-material/VpnKeySharp";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import theme from "../../config/theme";
import jwt_decode from "jwt-decode";
import { getEventsCount } from "../../redux/events";
import { store } from "../../redux/store";
import * as usersActions from "../../redux/users/actions";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
  button: {
    textTransform: "none",
  },
  marginTop: {
    marginTop: 30,
  },
}));

export const Login: FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const usehandleSubmit = async (_: React.MouseEvent) => {
    setError("");

    try {
      const data = await login(email, password);

      if (data) {
        let expire = jwt_decode<object>(data.token)["expire"];

        localStorage.setItem("token", data.token);
        localStorage.setItem("expire", expire as string);
        store.dispatch(usersActions.setUserToken(data.token));
        // CounterComponent();

        // console.log(store.getState().users.token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        // handle errors thrown from frontend
        setError(err.message);
      } else {
        // handle errors thrown from backend
        setError(String(err));
      }
    }
  };
  const paperStyle = {
    padding: 20,
    height: 470,
    width: 350,
    margin: "20vh auto",
  };

  return (
    <Paper elevation={15} style={paperStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h6">
            Sign in <Button onClick={getEventsCount}>sdsdf</Button>
          </Typography>
          <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.currentTarget.value)
                  }
                  fullWidth
                  autoFocus
                  required
                  inputProps={{ style: { backgroundColor: "WhiteSmoke" } }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={5} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.currentTarget.value)
                  }
                  fullWidth
                  required
                  inputProps={{ style: { backgroundColor: "WhiteSmoke" } }}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container alignItems="center">
              {error && (
                <Grid item>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                {/* TODO: запомнить меня не реализовано */}
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              className={classes.marginTop}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={usehandleSubmit}
                startIcon={<VpnKeySharpIcon />}
              >
                Login
              </Button>
            </Grid>
          </div>
        </Box>
      </Container>
    </Paper>
  );
};
