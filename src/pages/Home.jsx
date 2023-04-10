import React from "react";
import { HomeNavbar } from "../components/home/HomeNavbar";
import { HomeSidebar } from "../components/home/HomeSidebar";

export const Home = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="home-container">
          <div className="home-wrapper">Home</div>
        </div>
      </div>
    </div>
  );
};
