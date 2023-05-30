import React, { useEffect, useRef, useState } from "react";

import { RequestActions } from "./RequestActions";

import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import getUserById from "../../data/users/getUserById";
import getArtworkById from "../../data/artworks/getArtworkById";

import moment from "moment";
import * as MdIcons from "react-icons/md";

export const Request = ({
  request,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
}) => {
  const dropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [initiator, setInitiator] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [date, setDate] = useState(null);

  const closeHoverMenu = () => {
    setMenuOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

  useEffect(() => {
    const fetchData = async () => {
      const artData = await getArtworkById(request.artworkId);
      const inititorData = await getUserById(request.initiator);
      const dateFormatted = moment(request.date).format("MMMM DD, YYYY");

      setInitiator(inititorData);
      setArtwork(artData);
      setDate(dateFormatted);
    };

    if (request) {
      fetchData();
    }
  }, [request]);

  return (
    <div className="artworks-wrapper">
      <div className="artwork">
        <img
          src={artwork?.photoURL}
          alt="artwork"
          className="artwork-item"
          id="artwork-image"
        />
        <p className="artwork-item">{initiator?.displayName}</p>
        <p className="artwork-item">{date}</p>
        <p className="artwork-item">{request?.status}</p>
        <div className="actions" ref={dropdownRef}>
          <MdIcons.MdOutlineSettingsSuggest
            className="settings-icon"
            onMouseOver={() => setMenuOpen(true)}
          />
          {isMenuOpen && (
            <RequestActions
              requestId={request.id}
              isOpenConfirmationModal={isOpenConfirmationModal}
              setIsOpenConfirmationModal={setIsOpenConfirmationModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};
