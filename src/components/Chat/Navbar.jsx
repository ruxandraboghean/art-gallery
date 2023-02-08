import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import message from "../../images/message.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <img src={message} className="conversations" />
      <div className="all-conversations">Conversations</div>
    </div>
  );
};
