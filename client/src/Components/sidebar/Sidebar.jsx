import React, { PureComponent } from "react";
import "./sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TimelapseIcon from "@mui/icons-material/Timelapse";

export default class Sidebar extends PureComponent {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem active">
                <LineStyleIcon className="sidebarIcon"/>
                Home
              </li>
              <li className="sidebarListItem">
                <TimelapseIcon className="sidebarIcon"/>
                Analitics
              </li>
              <li className="sidebarListItem">
                <TrendingUpIcon className="sidebarIcon"/>
                Sales
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem active">
                <LineStyleIcon className="sidebarIcon"/>
                Home
              </li>
              <li className="sidebarListItem">
                <TimelapseIcon className="sidebarIcon"/>
                Analitics
              </li>
              <li className="sidebarListItem">
                <TrendingUpIcon className="sidebarIcon"/>
                Sales
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
