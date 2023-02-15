import React, { useContext } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserCard } from "./UserCard";
import { AuthContext } from "../../context/AuthContext";
import abstract from "../../images/abstract.png";
import { useState } from "react";
import { upload } from "../../firebase";
import { useEffect } from "react";

export const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  function handleChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleClick = () => {
    upload(image, currentUser, setLoading);
  };

  return (
    <div className="user-profile">
      <div className="header">
        <img src={photoURL} alt="User" className="user-image" />
        <div className="file-input-btn">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleChange}
          />
          <label htmlFor="file">
            <FontAwesomeIcon icon={faEdit} className="edit-btn" />
          </label>
        </div>
        {image && (
          <button
            disabled={loading || !image}
            onClick={handleClick}
            className="upload-btn"
          >
            Upload
          </button>
        )}

        <div className="user-info">
          <span className="username">
            {currentUser?.displayName &&
              capitalizeFirst(currentUser?.displayName)}
          </span>
          <img src={abstract} alt="abstract" className="abstract-icon" />
        </div>
      </div>
      <UserCard {...currentUser} />
    </div>
  );
};
