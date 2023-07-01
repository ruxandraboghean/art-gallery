import React from "react";

import { Box, Fab, Tooltip } from "@mui/material";
import { CheckCircle, DoDisturb } from "@mui/icons-material";
import { useContext } from "react";
import { RequestContext } from "../../context/RequestsContext";
import RequestStatusEnum from "../../enums/RequestStatusEnum";
import updateRequests from "../../data/requests/updateRequests";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import getArtworkById from "../../data/artworks/getArtworkById";

export const RequestPendingActions = ({ request }) => {
  const { userRequests, setUserRequests } = useContext(RequestContext);
  const { currentUser } = useContext(AuthContext);

  const handleChangeRequestStatus = async (newStatus) => {
    const newData = userRequests.map((req) => {
      if (req.id === request.id) {
        return newStatus === "accepted"
          ? { ...req, status: RequestStatusEnum.ACCEPTED }
          : { ...req, status: RequestStatusEnum.DENIED };
      }
      return req;
    });
    const reqModified = newData.find((req) => req.id === request.id);

    setUserRequests(newData);

    //send notification to user

    await updateDoc(doc(db, "users", reqModified.initiator), {
      notifications: arrayUnion({
        id: nanoid(),
        message: `Expert ${currentUser.displayName} has ${reqModified.status} your request`,
        time: new Date().getTime(),
      }),
    });
    await updateRequests(request.id, reqModified);

    const artworkReq = await getArtworkById(request.artworkId);

    await updateDoc(doc(db, "artworks", artworkReq.id), {
      status: "pending authentication",
    });
  };

  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ width: 100, height: 200 }}>
          <Tooltip title="accept" placement="left">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn"
              onClick={() => handleChangeRequestStatus("accepted")}
              sx={{ mb: 1 }}
            >
              <CheckCircle sx={{ fontSize: 20 }} />
            </Fab>
          </Tooltip>

          <Tooltip title="deny" placement="left">
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
