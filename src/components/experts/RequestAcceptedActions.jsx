import React from "react";

import { Box, Fab, Tooltip } from "@mui/material";
import { AddAPhoto, AttachFile } from "@mui/icons-material";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { useContext } from "react";
import { RequestContext } from "../../context/RequestsContext";
import RequestStatusEnum from "../../enums/RequestStatusEnum";
import updateRequests from "../../data/requests/updateRequests";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import getArtworkById from "../../data/artworks/getArtworkById";

export const RequestAcceptedActions = ({
  request,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
  isOpenDocumentsModal,
  setIsOpenDocumentsModal,
}) => {
  const [requestedArtwork, setRequestedArtwork] = useState(null);
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleOpenDocumentsModal = () => {
    setIsOpenDocumentsModal(true);
  };

  const handleIsForgery = () => {
    console.log("is forgery");
  };

  useEffect(() => {
    const getArtwork = async () => {
      const artwork = await getArtworkById(request.artworkId);

      setRequestedArtwork(artwork);
    };

    getArtwork();
  }, []);

  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ width: 100, height: 200 }}>
          <Tooltip title="add documents" placement="left">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn"
              onClick={handleOpenDocumentsModal}
              sx={{ mb: 1 }}
            >
              <AttachFile sx={{ fontSize: 20 }} />
            </Fab>
          </Tooltip>

          <Tooltip title="check as forgery" placement="left">
            <Fab
              color="secondary"
              aria-label="request"
              className="action-btn"
              onClick={handleIsForgery}
              sx={{ mb: 1 }}
            >
              <RemoveModeratorIcon sx={{ fontSize: 18 }} />
            </Fab>
          </Tooltip>
        </Box>
      </div>
    </>
  );
};
