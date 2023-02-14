import React, { useContext } from "react";
import message from "../../images/message.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <img src={message} className="conversations" />
      <div className="all-conversations">Conversations</div>
    </div>
  );
};
