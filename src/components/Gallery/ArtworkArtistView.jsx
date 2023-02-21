import React, { useRef, useState } from "react";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import * as MdIcons from "react-icons/md";
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
        <img src={artwork.photoURL} alt="artwork" />
        <p>{artwork?.title}</p>
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
