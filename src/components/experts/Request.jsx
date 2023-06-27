import React, { useContext, useEffect, useRef, useState } from "react";

import { RequestActions, RequestPendingActions } from "./RequestPendingActions";

import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import getUserById from "../../data/users/getUserById";
import getArtworkById from "../../data/artworks/getArtworkById";

import moment from "moment";
import * as MdIcons from "react-icons/md";
import { RequestAcceptedActions } from "./RequestAcceptedActions";
import { RequestDeniedActions } from "./RequestDeniedActions";
import { AuthContext } from "../../context/AuthContext";
import { RequestAcceptedActionsValidator } from "./RequestAcceptedActionsValidator";
import { Spinner } from "../utils/Spinner";

export const Request = ({
  request,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
  setCurrentRequest,
  isOpenDocumentsModal,
  setIsOpenDocumentsModal,
  artwork,
  setArtwork,
  currentRequest,
  requestedArtwork,
  setRequestedArtwork,
}) => {
  const dropdownRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [initiator, setInitiator] = useState(null);
  const [date, setDate] = useState(null);
  const [artPhoto, setArtPhoto] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { currentUser } = useContext(AuthContext);

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
      setArtPhoto(artData.photoURL);
      setDate(dateFormatted);
    };

    if (request) {
      fetchData();
    }
  }, [request]);

  useEffect(() => {
    const getUserRole = async () => {
      const userData = await getUserById(currentUser.uid);
      setUserRole(userData.role);
    };
    getUserRole();
  }, []);

  if (!artwork) {
    return <Spinner />;
  }

  return (
    <div className="artworks-wrapper">
      <div className="artwork">
        <img
          src={artPhoto}
          alt="artwork"
          className="artwork-item"
          id="artwork-image"
        />
        <p className="artwork-item">{initiator?.displayName}</p>
        <p className="artwork-item">{date}</p>
        <p className="artwork-item">{request.status}</p>
        <div className="actions" ref={dropdownRef}>
          <MdIcons.MdOutlineSettingsSuggest
            className="settings-icon"
            onMouseOver={() => setMenuOpen(true)}
          />
          {isMenuOpen && request.status === "pending" && (
            <RequestPendingActions request={request} />
          )}
          {isMenuOpen &&
          request.status === "accepted" &&
          userRole === "expert" ? (
            <RequestAcceptedActions
              request={request}
              isOpenConfirmationModal={isOpenConfirmationModal}
              setIsOpenConfirmationModal={setIsOpenConfirmationModal}
              isOpenDocumentsModal={isOpenDocumentsModal}
              setIsOpenDocumentsModal={setIsOpenDocumentsModal}
              setCurrentRequest={setCurrentRequest}
              currentRequest={currentRequest}
              setRequestedArtwork={setRequestedArtwork}
              requestedArtwork={requestedArtwork}
            />
          ) : (
            isMenuOpen &&
            request.status === "accepted" &&
            userRole === "validator" && (
              <RequestAcceptedActionsValidator
                request={request}
                isOpenConfirmationModal={isOpenConfirmationModal}
                setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                isOpenDocumentsModal={isOpenDocumentsModal}
                setIsOpenDocumentsModal={setIsOpenDocumentsModal}
                setCurrentRequest={setCurrentRequest}
                currentRequest={currentRequest}
                setRequestedArtwork={setRequestedArtwork}
                requestedArtwork={requestedArtwork}
              />
            )
          )}
          {isMenuOpen && request.status === "denied" && (
            <RequestDeniedActions
              request={request}
              isOpenConfirmationModal={isOpenConfirmationModal}
              setIsOpenConfirmationModal={setIsOpenConfirmationModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};
