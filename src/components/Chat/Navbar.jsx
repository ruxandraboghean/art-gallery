import React from "react";
import message from "../../images/message.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <img src={message} className="conversations" alt="message" />
      <div className="all-conversations">Conversations</div>
    </div>
  );
};
