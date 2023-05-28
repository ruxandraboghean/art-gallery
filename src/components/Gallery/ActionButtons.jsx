import React, { useContext, useState } from "react";

import { Box, Fab, Tooltip } from "@mui/material";
import { DeleteForever, EditOutlined } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

import { ArtworkModalContext } from "../../context/ArtworkModalContext";

export const ActionButtons = ({
  artworkId,
  setIsOpenConfirmationModal,
  setCurrentArtwork,
}) => {
  const { setMenuDropdownOpen, handleOpenModal } =
    useContext(ArtworkModalContext);

  const handleDelete = () => {
    setIsOpenConfirmationModal(true);
    setCurrentArtwork(artworkId);
  };
  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ width: 100, height: 200 }}>
          <Tooltip title="edit artwork" placement="left">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn"
              onClick={() => {
                handleOpenModal("edit", "artwork", artworkId);
                setMenuDropdownOpen(true);
              }}
              sx={{ mb: 1 }}
            >
              <EditOutlined sx={{ fontSize: 20 }} />
            </Fab>
          </Tooltip>

          <Tooltip title="send request to specialist" placement="right">
            <Fab
              color="secondary"
              aria-label="request"
              className="action-btn"
              onClick={() => {
                handleOpenModal("edit", "artwork", artworkId);
                setMenuDropdownOpen(true);
              }}
              sx={{ mb: 1 }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </Fab>
          </Tooltip>

          <Tooltip title="delete artwork" placement="right">
            <Fab
              color="secondary"
              aria-label="delete"
              className="action-btn notransition"
              onClick={handleDelete}
              sx={{ mb: 1 }}
            >
              <DeleteForever sx={{ fontSize: 20 }} />
            </Fab>
          </Tooltip>
        </Box>
      </div>
    </>
  );
};
