import React, { useRef, useContext } from "react";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import { AuthContext } from "../../context/AuthContext";
import UserSubmenu from "./UserSubmenu";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";

export const HomeNavbar = () => {
  const { setMenuDropdownOpen, isMenuDropdownOpen } =
    useContext(ArtworkModalContext);

  const dropdownRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  const closeHoverMenu = () => {
    setMenuDropdownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);
  return (
    <div className="home-navbar">
      <div ref={dropdownRef} className="menu-header">
        <img
          src={currentUser.photoURL}
          className="current-user"
          onMouseOver={() => setMenuDropdownOpen(true)}
          alt="Avatar"
        />
        {isMenuDropdownOpen && <UserSubmenu />}
      </div>
    </div>
  );
};
