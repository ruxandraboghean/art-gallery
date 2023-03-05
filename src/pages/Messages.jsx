import React from "react";
import { Chat } from "../components/Chat/Chat";
import { ChatProfile } from "../components/Chat/ChatProfile";
import { Sidebar } from "../components/Chat/Sidebar";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const Messages = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="home-chat">
          <div className="container">
            <Sidebar />
            <Chat />
            <ChatProfile />
          </div>
        </div>
      </div>
    </div>
  );
};
