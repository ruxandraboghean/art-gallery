import React, { useContext, useState } from "react";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";

export const CertifiedArtwork = ({ art, setIsOpenArtwork }) => {
  const { setCurrentCertifiedArtworkItem } = useContext(ArtworkModalContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenArtwork = () => {
    setCurrentCertifiedArtworkItem(art);
    setIsOpenArtwork(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`artwork-card-wrapper ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOpenArtwork}
    >
      <div
        className="img-wrapper"
        style={{
          backgroundImage: `url(${art.photoURL})`,
        }}
      >
        <span></span>
        <div className="info-wrapper">
          <div className="info-profile">
            <div className="profile-info">
              <span> {art.description} </span>
            </div>
            <div className="profile-info">
              <span> {art.year} </span>
            </div>
          </div>

          <div>
            <span>{art.title} </span>
          </div>
        </div>
      </div>
    </div>
  );
};
