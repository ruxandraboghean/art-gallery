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
    <div className="home-navbar" onMouseOver={() => setMenuDropdownOpen(true)}>
      <div ref={dropdownRef} className="menu-header" data-testid="menu-header">
        <img
          src={currentUser.photoURL}
          className="current-user"
          alt="Avatar"
          data-testid="image-user"
        />
        {isMenuDropdownOpen && <UserSubmenu />}
      </div>
    </div>
  );
};
