import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Fab } from "@mui/material";
import { DeleteForever, RemoveRedEye, EditOutlined } from "@mui/icons-material";

export const ActionButtons = ({
  artworkId,
  isOpenArtwork,
  setIsOpenArtwork,
  setArtworkId,
  setMenuDropdownOpen,
  handleOpenModal,
}) => {
  const navigate = useNavigate();

  const handleSeeGalleryButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ width: 100, height: 200 }}>
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
          <Fab
            color="secondary"
            aria-label="edit"
            className="action-btn"
            onClick={handleSeeGalleryButtonClick}
            sx={{ mb: 1 }}
          >
            <RemoveRedEye sx={{ fontSize: 20 }} />
          </Fab>
          <Link to="/">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn notransition"
              onClick={() => console.log("remove")}
              sx={{ mb: 1 }}
            >
              <DeleteForever sx={{ fontSize: 20 }} />
            </Fab>
          </Link>
        </Box>
      </div>
    </>
  );
};
