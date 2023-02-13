import React, { useContext } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserCard } from "./UserCard";
import { AuthContext } from "../../context/AuthContext";

export const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="user-profile">
      <div className="header">
        <img src={currentUser.photoURL} alt="User" className="user-image" />
        <span className="username"> {currentUser.displayName} </span>
        <FontAwesomeIcon icon={faEdit} className="edit-btn" />
      </div>
      <UserCard {...currentUser} />
    </div>
  );
};
