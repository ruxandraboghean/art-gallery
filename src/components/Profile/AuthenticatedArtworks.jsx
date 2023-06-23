import React, { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import getCurrentUserArtworks from "../../data/currentUser/getCurrentUserArtworks";
import { useEffect } from "react";
import { useState } from "react";
import * as MdIcons from "react-icons/md";
import { AuthenticatedArtActionButtons } from "./AuthenticatedArtActionButtons";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";

export const AuthenticatedArtworks = () => {
  const { currentUser } = useContext(AuthContext);
  const { userArtworks, setUserArtworks } = useContext(ArtworkModalContext);
  const [userAuthenticatedArtworks, setUserAuthenticatedArtworks] =
    useState(null);

  const dropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeHoverMenu = () => {
    setMenuOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(currentUser).length > 0) {
        const userArtworksData = await getCurrentUserArtworks(currentUser);
        await setUserArtworks(userArtworksData);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);
  useEffect(() => {
    if (userArtworks.length !== 0) {
      const filteredArtworks = userArtworks.filter(
        (art) => art.isAuthenticated === true
      );
      setUserAuthenticatedArtworks(filteredArtworks);
    }
  }, [userArtworks]);

  return userAuthenticatedArtworks?.map((artwork) => {
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
            {isMenuOpen && (
              <AuthenticatedArtActionButtons
                artwork={artwork}
                // isOpenConfirmationModal={isOpenConfirmationModal}
                // setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                // setCurrentArtwork={setCurrentArtwork}
              />
            )}
          </div>
        </div>
      </div>
    );
  });
};
