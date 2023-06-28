import React from "react";
import { Chat } from "../../../components/chat/Chat";
import { Sidebar } from "../../../components/chat/Sidebar";

export const Messages = () => {
  return (
    <div className="home-chat">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
