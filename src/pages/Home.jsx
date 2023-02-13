import React, { useState } from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const Home = () => {
  return (
    <div className="home">
      <div className="sidebar-menu">
        <HomeSidebar />
      </div>
      <div className="navbar">
        <HomeNavbar />
        <div className="home-container">
          <div className="home-wrapper">Home</div>
        </div>
      </div>
    </div>
  );
};
