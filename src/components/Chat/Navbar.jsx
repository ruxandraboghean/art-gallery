import React from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const Navbar = () => {
  const logout = () => {};

  return (
    <div className="navbar">
      <div className="all-conversations">Conversations</div>
      <div className="settings">
        <FontAwesomeIcon icon={faGear} />
      </div>
      <button className="send-button" onClick={() => signOut(auth)}>
        logout
      </button>
    </div>
  );
};
