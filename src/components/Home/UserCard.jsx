import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const UserCard = () => {
  return (
    <div className="user-card">
      <div className="details">
        <div className="details-header">
          <span>Details</span>
          <FontAwesomeIcon icon={faEdit} className="edit-btn" />
        </div>
        <div className="details-content">
          <span>E-mail: </span>
        </div>
      </div>
    </div>
  );
};
