import React from "react";
import { Sidebar } from "../../../components/chat/Sidebar";
import { Chat } from "../../../components/chat/Chat";

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
