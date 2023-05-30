import React from "react";

import { Box, Fab, Tooltip } from "@mui/material";
import { CheckCircle, DoDisturb } from "@mui/icons-material";
import { useContext } from "react";
import { RequestContext } from "../../context/RequestsContext";
import RequestStatusEnum from "../../enums/RequestStatusEnum";
import updateRequests from "../../data/updateRequests";

export const RequestActions = ({ requestId }) => {
  const { userRequests, setUserRequests } = useContext(RequestContext);

  const handleChangeRequestStatus = async (newStatus) => {
    const newData = userRequests.map((req) => {
      if (req.id === requestId) {
        return newStatus === "accepted"
          ? { ...req, status: RequestStatusEnum.ACCEPTED }
          : { ...req, status: RequestStatusEnum.DENIED };
      }
      return req;
    });

    setUserRequests(newData);

    const reqModified = newData.find((req) => req.id === requestId);

    await updateRequests(requestId, reqModified);
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
