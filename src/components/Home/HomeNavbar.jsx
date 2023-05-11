import React from "react";
import { MenuHeader } from "./MenuHeader";

export const HomeNavbar = ({
  setCurrentMenuItem,
  setIsOpenArtwork,
  isOpenArtwork,
  artworkId,
  setMenuDropdownOpen,
  isMenuDropdownOpen,
  handleOpenModal,
  setIsSuccess,
  setHasDisplayedMessage,
}) => {
  return (
    <div className="home-navbar">
      <MenuHeader
        setCurrentMenuItem={setCurrentMenuItem}
        setIsOpenArtwork={setIsOpenArtwork}
        isOpenArtwork={isOpenArtwork}
        artworkId={artworkId}
        setMenuDropdownOpen={setMenuDropdownOpen}
        isMenuDropdownOpen={isMenuDropdownOpen}
        handleOpenModal={handleOpenModal}
        setIsSuccess={setIsSuccess}
        setHasDisplayedMessage={setHasDisplayedMessage}
      />
    </div>
  );
};
