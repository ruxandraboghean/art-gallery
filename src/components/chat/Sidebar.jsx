import React from "react";
import { Chats } from "./Chats";
import { Search } from "./Search";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Search />
      <Chats />
    </div>
  );
};
