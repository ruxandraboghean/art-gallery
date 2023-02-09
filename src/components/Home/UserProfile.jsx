import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserCard } from "./UserCard";

export const UserProfile = () => {
  return (
    <div className="user-profile">
      <span> Profil </span>
      <div className="header">
        <img src="" alt="" />
        <span> username </span>
        <FontAwesomeIcon icon={faEdit} className="edit-btn" />
      </div>
      <UserCard />
    </div>
  );
};
