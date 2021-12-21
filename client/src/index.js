import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./Pages/dashboard/Dashboard";
import Login from "./Pages/authentication/Login";
import Registration from "./Pages/Registration";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Axios from "axios";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// defaultTheme
import themes from "./themes";
import Topbar from "./Components/topbar/Topbar";

function IsLoggedIn() {
  const [loginStatus, setLoginStatus] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      } else {
        setLoginStatus("Not logged in!");
      }
    });
  }, []);
}

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        render={() => {
          return this.state;
        }}
        element={<App />}
      />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
