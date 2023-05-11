import React, { useRef, useState, useContext } from "react";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import { AuthContext } from "../../context/AuthContext";
import UserSubmenu from "./UserSubmenu";

export function MenuHeader({
  setCurrentMenuItem,
  setIsOpenArtwork,
  isOpenArtwork,
  artworkId,
  setMenuDropdownOpen,
  isMenuDropdownOpen,
  handleOpenModal,
  setIsSuccess,
  setHasDisplayedMessage,
}) {
  const dropdownRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  const closeHoverMenu = () => {
    setMenuDropdownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

  return (
    <div ref={dropdownRef}>
      <img
        src={currentUser.photoURL}
        className="current-user"
        onMouseOver={() => setMenuDropdownOpen(true)}
        alt="Avatar"
      />
      {isMenuDropdownOpen && (
        <UserSubmenu
          setCurrentMenuItem={setCurrentMenuItem}
          setIsOpenArtwork={setIsOpenArtwork}
          isOpenArtwork={isOpenArtwork}
          artworkId={artworkId}
          handleOpenModal={handleOpenModal}
          setIsSuccess={setIsSuccess}
          setHasDisplayedMessage={setHasDisplayedMessage}
        />
      )}
    </div>
  );
}
