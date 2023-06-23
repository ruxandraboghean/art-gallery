import React, { useContext, useState } from "react";

import { Box, Fab, Tooltip } from "@mui/material";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

export const AuthenticatedArtActionButtons = ({
  artwork,
  setIsOpenConfirmationModal,
  setCurrentArtwork,
}) => {
  const { setMenuDropdownOpen, handleOpenModal } =
    useContext(ArtworkModalContext);

  const handleDownloadReport = async () => {
    try {
      const response = await fetch(artwork.reportURL, { mode: "no-cors" });

      const blob = await response.blob();

      console.log(response, "blob");
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "expert_report.pdf"; // Specify the desired filename
      link.click();

      // Clean up the temporary link
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the report:", error);
    }
  };
  const handleDownloadCertificate = () => {
    //
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
              onClick={handleDownloadReport}
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
              onClick={handleDownloadCertificate}
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
