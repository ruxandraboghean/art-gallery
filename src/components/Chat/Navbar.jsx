import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import conversations from "../../images/conversations.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      {/* <FontAwesomeIcon icon={faMessage} /> */}
      <img src={conversations} className="conversations" />
      <div className="all-conversations">Conversations</div>
    </div>
  );
};
