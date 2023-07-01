import React from "react";
import { ref, getDownloadURL } from "firebase/storage";

import { Box, Fab, Tooltip } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { storage } from "../../firebase";

export const AuthenticatedArtActionButtons = ({
  artwork,
  setAuthenticatedMenuOpen,
}) => {
  const handleDownloadReport = async () => {
    getDownloadURL(ref(storage, `${artwork.id}/report`))
      .then((url) => {
        window.open(url, "_blank");
        console.log(url, "url");
      })
      .catch((error) => {
        console.log("an error ocured", error);
      });
  };
  const handleDownloadCertificate = () => {
    getDownloadURL(ref(storage, `${artwork.id}/certificate`))
      .then((url) => {
        window.open(url, "_blank");
        console.log(url, "url");
      })
      .catch((error) => {
        console.log("an error ocured", error);
      });
  };

  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ width: 100, height: 200 }}>
          <Tooltip title="download expert report" placement="left">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn"
              onClick={() => {
                setAuthenticatedMenuOpen(true);
                handleDownloadReport();
              }}
              sx={{ mb: 1 }}
            >
              <DownloadForOfflineIcon sx={{ fontSize: 20 }} />
            </Fab>
          </Tooltip>

          <Tooltip title="download certificate" placement="left">
            <Fab
              color="secondary"
              aria-label="request"
              className="action-btn"
              onClick={() => {
                setAuthenticatedMenuOpen(true);
                handleDownloadCertificate();
              }}
              sx={{ mb: 1 }}
            >
              <DownloadForOfflineIcon sx={{ fontSize: 18 }} />
            </Fab>
          </Tooltip>
        </Box>
      </div>
    </>
  );
};
