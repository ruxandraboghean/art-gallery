import React from "react";
import { Chat } from "../components/Chat/Chat";
import { Sidebar } from "../components/Chat/Sidebar";


export const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
