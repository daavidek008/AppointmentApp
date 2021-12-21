import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Login.css";

// material-ui
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import {
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#673ab7",
    ":hover": {
      backgroundColor: "#5e35b1",
    },
  }));

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
        navigate("/dashboard");
      }
    });
  };

  const userAuthenthicated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <div className="login">
            <Card className="loginCard">
              <CardContent>
                <div className="loginHeader">
                  <Grid container spacing={2}>
                    <Grid item xs={3} className="loginLogo">
                      <AddCommentIcon />
                    </Grid>
                    <Grid item xs={9}>
                      <div className="loginLogoText">Appointment App</div>
                    </Grid>
                  </Grid>
                </div>
                <div className="loginWelcomeText">
                  <h2>Hi, Welcome Back</h2>
                </div>
                <div>
                  <div className="inputLogin">
                    <TextField
                      fullWidth
                      id="outlined-error"
                      label="Username"
                      variant="outlined"
                      error = '{loginStatus}'
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="inputLogin">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Password"
                      type={showPassword ? "text" : "password"} // <-- This is where the magic happens variant="outlined"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <LoginButton
                  className="loginButton"
                  fullWidth
                  variant="contained"
                  onClick={login}
                >
                  Sign In
                </LoginButton>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>

      {loginStatus && (
        <button onClick={userAuthenthicated}> Check if Authenticated</button>
      )}
    </div>
  );
}
