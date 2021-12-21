import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";
import Topbar from "./Components/topbar/Topbar";
import Sidebar from "./Components/sidebar/Sidebar";
import Dashboard from "./Pages/dashboard/Dashboard";

function App() {
  Axios.defaults.withCredentials = true;

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

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Dashboard className="dashboard"/>


      </div>
    </div>
  );
}

export default App;

/*
<div className="content">
<h1>Application</h1>
<div>
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/login">Login</Link>
</div>
<div>
  <Link to="/registration">registration</Link>
</div>
<h1>{loginStatus}</h1>
</div>*/