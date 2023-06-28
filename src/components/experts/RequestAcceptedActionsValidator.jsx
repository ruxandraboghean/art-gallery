import React from "react";

import { Box, Fab, Tooltip } from "@mui/material";
import { Edit, DoDisturb, Check } from "@mui/icons-material";
import { useContext } from "react";
import { RequestContext } from "../../context/RequestsContext";
import RequestStatusEnum from "../../enums/RequestStatusEnum";
import updateRequests from "../../data/requests/updateRequests";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import getArtworkById from "../../data/artworks/getArtworkById";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { getDownloadURL, ref } from "firebase/storage";
export const RequestAcceptedActionsValidator = ({
  request,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
  isOpenDocumentsModal,
  setIsOpenDocumentsModal,
  setCurrentRequest,
  currentRequest,
  setRequestedArtwork,
  requestedArtwork,
}) => {
  const { userRequests, setUserRequests } = useContext(RequestContext);
  const { currentUser } = useContext(AuthContext);

  const getArtwork = async () => {
    const artwork = await getArtworkById(request.artworkId);
    setRequestedArtwork(artwork);
  };

  const handleDownloadCertificate = () => {
    console.log(request.artworkId);
    getDownloadURL(ref(storage, `${request.artworkId}- certificate`))
      .then((url) => {
        window.open(url, "_blank");
        console.log(url, "url");
      })
      .catch((error) => {
        console.log("an error ocured", error);
      });
  };

  const handleValidateCertificate = async (result) => {
    await getArtwork();

    console.log(requestedArtwork, "rek art");
    if (result === "invalid") {
      await updateDoc(doc(db, "artworks", requestedArtwork.id), {
        status: "forgery",
        isAuthenticated: false,
      });
      await updateDoc(doc(db, "requests", request.id), {
        status: "completed",
      });
    } else if (result === "valid") {
      await updateDoc(doc(db, "artworks", requestedArtwork.id), {
        status: "validated",
        isAuthenticated: true,
      });
      await updateDoc(doc(db, "requests", request.id), {
        status: "completed",
      });
    }

    //send notification to user
    await updateDoc(doc(db, "users", request.initiator), {
      notifications: arrayUnion({
        id: nanoid(),
        message: `Expert ${currentUser.displayName} has completed your request`,
        time: new Date().getTime(),
      }),
    });
  };

  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ width: 60, height: 200 }}>
          <Tooltip title="download certificate" placement="left">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn"
              onClick={handleDownloadCertificate}
              sx={{ mb: 1 }}
            >
              <DownloadForOfflineIcon sx={{ fontSize: 15 }} />
            </Fab>
          </Tooltip>
          <Tooltip title="validate certificate" placement="left">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn"
              onClick={() => handleValidateCertificate("valid")}
              sx={{ mb: 1 }}
            >
              <Check sx={{ fontSize: 15 }} />
            </Fab>
          </Tooltip>

          <Tooltip title="invalid certificate" placement="left">
            <Fab
              color="secondary"
              aria-label="request"
              className="action-btn"
              onClick={() => handleValidateCertificate("invalid")}
              sx={{ mb: 1 }}
            >
              <DoDisturb sx={{ fontSize: 18 }} />
            </Fab>
          </Tooltip>
        </Box>
      </div>
    </>
  );
};
