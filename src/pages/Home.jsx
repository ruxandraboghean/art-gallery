import React from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";
import { MenuHeader } from "../components/Home/MenuHeader";
import { HomeChat } from "./HomeChat";

export const Home = () => {
  return (
    <>
      <div className="home">
        <HomeSidebar />
        <div className="navbar">
          <HomeNavbar />
          <HomeChat />
        </div>
      </div>
    </>
  );
};
