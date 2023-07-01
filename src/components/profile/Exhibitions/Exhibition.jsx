import React, { useRef, useState } from "react";
import * as MdIcons from "react-icons/md";
import { useOnHoverOutside } from "../../../hooks/useOnHoverOutside";
import { ExhibitonActionButtons } from "../ExhibitonActionButtons";

export const Exhibition = ({ exhibition, exhibitions, setUserExhibitions }) => {
  const dropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeHoverMenu = () => {
    setMenuOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);
  return (
    <div className="artworks-wrapper" key={exhibition.id}>
      <div className="artwork">
        <img
          src={exhibition.coverPhotoURL}
          alt="artwork"
          className="artwork-item"
          id="artwork-image"
        />
        <p className="artwork-item">{exhibition?.title}</p>
        <p className="artwork-item">{exhibition?.year}</p>
        <div className="actions" ref={dropdownRef}>
          <MdIcons.MdOutlineSettingsSuggest
            className="settings-icon"
            onMouseOver={() => setMenuOpen(true)}
          />
          {isMenuOpen && (
            <ExhibitonActionButtons
              exhibition={exhibition}
              exhibitions={exhibitions}
              setUserExhibitions={setUserExhibitions}
            />
          )}
        </div>
      </div>
    </div>
  );
};
