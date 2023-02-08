import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import React, { useRef, useState, useContext } from "react";
import UserMenu from "./UserMenu";
import { AuthContext } from "../../context/AuthContext";

export function MenuHeader() {
  const dropdownRef = useRef(null);
  const [isMenuDropdownOpen, setMenuDropdownOpen] = useState(false);
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
      />
      {isMenuDropdownOpen && <UserMenu />}
    </div>
  );
}