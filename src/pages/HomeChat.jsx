import React from "react";
import { Chat } from "../components/Chat/Chat";
import { Sidebar } from "../components/Chat/Sidebar";

export const HomeChat = () => {
  return (
    <>
      <div className="home-chat">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </>
  );
};
