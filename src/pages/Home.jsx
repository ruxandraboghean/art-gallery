import React, { useContext } from "react";
import { Chat } from "../components/Chat/Chat";
import { Sidebar } from "../components/Chat/Sidebar";
import { MenuHeader } from "../components/Home/MenuHeader";
import { AuthContext } from "../context/AuthContext";

export const Home = () => {
  return (
    <>
      <MenuHeader />
      <div className="home">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </>
  );
};
