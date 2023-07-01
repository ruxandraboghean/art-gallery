import React, { useRef, useState } from "react";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import * as MdIcons from "react-icons/md";
import { ActionButtons } from "./ActionButtons";

export const ArtworkArtistView = ({
  artwork,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
  setCurrentArtwork,
}) => {
  const dropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeHoverMenu = () => {
    setMenuOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

  return (
    <div className="artworks-wrapper">
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
          {isMenuOpen && (
            <ActionButtons
              artworkId={artwork.id}
              isOpenConfirmationModal={isOpenConfirmationModal}
              setIsOpenConfirmationModal={setIsOpenConfirmationModal}
              setCurrentArtwork={setCurrentArtwork}
            />
          )}
        </div>
      </div>
    </div>
  );
};
