import React from "react";
import { useRef } from "react";
import { useState } from "react";
import * as MdIcons from "react-icons/md";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import { ActionButtons } from "./ActionButtons";

export const ArtworkArtistView = ({ artwork }) => {
  const dropdownRef = useRef(null);
  const [isMenuDropdownOpen, setMenuDropdownOpen] = useState(false);

  const closeHoverMenu = () => {
    setMenuDropdownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

  return (
    <div className="artworks-wrapper">
      <div className="artwork">
        <img src={artwork.photoURL} />
        <p>{artwork?.artworkInfo?.title}</p>
        <p>{artwork?.status}</p>
        <div className="actions" ref={dropdownRef}>
          <MdIcons.MdOutlineSettingsSuggest
            className="settings-icon"
            onMouseOver={() => setMenuDropdownOpen(true)}
          />
          {isMenuDropdownOpen && <ActionButtons artworkId={artwork.id} />}
        </div>
      </div>
    </div>
  );
};
