import React from "react";

import { Box, Fab, Tooltip } from "@mui/material";
import { Edit, DoDisturb } from "@mui/icons-material";
import { useContext } from "react";
import { RequestContext } from "../../context/RequestsContext";
import RequestStatusEnum from "../../enums/RequestStatusEnum";
import updateRequests from "../../data/requests/updateRequests";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import getArtworkById from "../../data/artworks/getArtworkById";

export const RequestAcceptedActions = ({
  request,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
  isOpenDocumentsModal,
  setIsOpenDocumentsModal,
  setCurrentRequest,
  currentRequest,
  setRequestedArtwork,
}) => {
  const { userRequests, setUserRequests } = useContext(RequestContext);
  const { currentUser } = useContext(AuthContext);

  const getArtwork = async () => {
    const artwork = await getArtworkById(request.artworkId);
    setRequestedArtwork(artwork);
  };

  const handleOpenDocumentsModal = async () => {
    await setIsOpenDocumentsModal(true);
    await setCurrentRequest(request);
    await getArtwork();
  };

  const handleChangeRequestStatus = async (newStatus) => {
    const newData = userRequests.map((req) => {
      if (req.id === request.id) {
        return newStatus === "accepted"
          ? { ...req, status: RequestStatusEnum.ACCEPTED }
          : { ...req, status: RequestStatusEnum.DENIED };
      }
      return req;
    });
    const reqModified = newData.find((req) => req.id === currentRequest.id);

    setUserRequests(newData);

    //send notification to user

    await updateDoc(doc(db, "users", reqModified.initiator), {
      notifications: arrayUnion({
        id: nanoid(),
        message: `Expert ${currentUser.displayName} has ${reqModified.status} your request`,
        time: new Date().getTime(),
      }),
    });
    await updateRequests(currentRequest.id, reqModified);

    const artworkReq = await getArtworkById(currentRequest.artworkId);

    await updateDoc(doc(db, "artworks", artworkReq.id), {
      status: "pending authentication",
    });
  };

  // useEffect(() => {

  //   getArtwork();
  // }, []);

  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ width: 60, height: 200 }}>
          <Tooltip title="add documents" placement="left">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn"
              onClick={handleOpenDocumentsModal}
              sx={{ mb: 1 }}
            >
              <Edit sx={{ fontSize: 15 }} />
            </Fab>
          </Tooltip>

          <Tooltip title="deny request" placement="left">
            <Fab
              color="secondary"
              aria-label="request"
              className="action-btn"
              onClick={() => handleChangeRequestStatus("denied")}
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
