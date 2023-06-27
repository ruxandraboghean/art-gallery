import React, { useContext, useState } from "react";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";

export const Artist = ({ user, setIsOpenUserModal }) => {
  const { setCurrentArtist } = useContext(ArtworkModalContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenArtwork = () => {
    setCurrentArtist(user);
    setIsOpenUserModal(true);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      key={user.uid}
      className={`artist-card-wrapper ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOpenArtwork}
    >
      <div
        className="img-wrapper"
        style={{
          backgroundImage: `url(${user.photoURL})`,
        }}
      >
        <span></span>
        <div className="info-wrapper">
          <div className="profile-info">
            <span> role: {user.role} </span>
            <span> motto: {user.motto} </span>
          </div>
          <div>
            <span> {user.displayName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
