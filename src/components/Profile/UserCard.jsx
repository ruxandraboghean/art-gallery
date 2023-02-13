import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Instagram, YouTube } from "@mui/icons-material";
import React from "react";
import blog from "../../images/blog.png";

export const UserCard = (currentUser) => {
  return (
    <div className="user-card">
      <div className="details">
        <div className="details-header">
          <span className="details-span">Details</span>
          <FontAwesomeIcon icon={faEdit} className="edit-btn" />
        </div>
        <div className="details-content">
          <span className="details-span">E-mail: {currentUser.email} </span>
        </div>
      </div>

      <div className="details">
        <div className="details-header">
          <span className="details-span">Motto</span>
          <FontAwesomeIcon icon={faEdit} className="edit-btn" />
        </div>
        <div className="details-content">
          <span className="details-span"> {currentUser.motto}</span>
        </div>
      </div>

      <div className="details">
        <div className="details-header">
          <span className="details-span">Biography</span>
          <FontAwesomeIcon icon={faEdit} className="edit-btn" />
        </div>
        <div className="details-content">
          <span className="details-span">{currentUser.biography} </span>
        </div>
      </div>

      <div className="details">
        <div className="details-header">
          <span className="details-span">Social Links</span>
          <FontAwesomeIcon icon={faEdit} className="edit-btn" />
        </div>
        <div className="details-content">
          <div className="social-links">
            <Instagram size="medium" className="instagram" />
            <YouTube className="youtube" />
            <img src={blog} alt="Blog" className="blog" />
          </div>
        </div>
      </div>
    </div>
  );
};
