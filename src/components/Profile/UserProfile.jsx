import React, { useContext } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserCard } from "./UserCard";
import { AuthContext } from "../../context/AuthContext";

export const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="user-profile">
      <div className="header">
        <img src={currentUser?.photoURL} alt="User" className="user-image" />
        <span className="username">
          {currentUser?.displayName &&
            capitalizeFirst(currentUser?.displayName)}
        </span>
        <FontAwesomeIcon icon={faEdit} className="edit-btn" />
      </div>
      <UserCard {...currentUser} />
    </div>
  );
};
