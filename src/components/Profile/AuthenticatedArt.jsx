import React, { useRef, useState } from "react";
import * as MdIcons from "react-icons/md";
import { AuthenticatedArtActionButtons } from "./AuthenticatedArtActionButtons";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";

export const AuthenticatedArt = ({ artwork }) => {
  const dropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeHoverMenu = () => {
    setMenuOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);
  return (
    <div className="artworks-wrapper" key={artwork.id}>
      <div className="artwork">
        <img
          src={artwork.photoURL}
          alt="artwork"
          className="artwork-item"
          id="artwork-image"
        />
        <p className="artwork-item">{artwork?.title}</p>
        <p className="artwork-item">{artwork?.year}</p>
        <p className="artwork-item">{artwork?.status}</p>
        <div className="actions" ref={dropdownRef}>
          <MdIcons.MdOutlineSettingsSuggest
            className="settings-icon"
            onMouseOver={() => setMenuOpen(true)}
          />
          {isMenuOpen && <AuthenticatedArtActionButtons artwork={artwork} />}
        </div>
      </div>
    </div>
  );
};
