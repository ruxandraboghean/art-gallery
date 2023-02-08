import React, { useContext } from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

export const Navbar = () => {
  return (
    <div className="navbar">
      <FontAwesomeIcon icon={faMessage} />
      <div className="all-conversations">Conversations</div>
    </div>
  );
};
