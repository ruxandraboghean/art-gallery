import React from "react";
import { Chat } from "../components/Chat/Chat";
import { Sidebar } from "../components/Chat/Sidebar";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const Messages = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="navbar">
        <HomeNavbar />
        <div className="home-chat">
          <div className="container">
            <Sidebar />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};
