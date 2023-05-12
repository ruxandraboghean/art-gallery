import React, { useRef, useState } from "react";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import * as MdIcons from "react-icons/md";
import { ActionButtons } from "./ActionButtons";

export const ArtworkArtistView = ({ artwork, setIsSuccess }) => {
  const dropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeHoverMenu = () => {
    setMenuOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

  return (
    <div className="artworks-wrapper">
      <div className="artwork">
        <img src={artwork.photoURL} alt="artwork" />
        <p>{artwork?.title}</p>
        <p>{artwork?.year}</p>
        <p>{artwork?.status}</p>
        <div className="actions" ref={dropdownRef}>
          <MdIcons.MdOutlineSettingsSuggest
            className="settings-icon"
            onMouseOver={() => setMenuOpen(true)}
          />
          {isMenuOpen && (
            <ActionButtons artworkId={artwork.id} setIsSuccess={setIsSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};
