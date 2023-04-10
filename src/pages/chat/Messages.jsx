import React from "react";
import { Chat } from "../../components/chat/Chat";
import { ChatProfile } from "../../components/chat/ChatProfile";
import { Sidebar } from "../../components/chat/Sidebar";
import { HomeNavbar } from "../../components/home/HomeNavbar";
import { HomeSidebar } from "../../components/home/HomeSidebar";

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
