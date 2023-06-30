import React, { useContext, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";

import { Box, Fab, Tooltip } from "@mui/material";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { db, storage } from "../../firebase";
import { DeleteForever, Edit } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";

export const ExhibitonActionButtons = ({
  exhibition,
  setIsOpenConfirmationModal,
  setCurrentArtwork,
  exhibitions,
  setUserExhibitions,
}) => {
  const { handleOpenModal } = useContext(ArtworkModalContext);

  const handleDeleteExhibition = async () => {
    const exhibitionDocRef = doc(db, "exhibitions", exhibition.id);

    await deleteDoc(exhibitionDocRef)
      .then(() => console.log("Item deleted successfully"))
      .catch((err) => console.error("Error deleting item: ", err));

    await setUserExhibitions((prevExpos) =>
      prevExpos.filter((expo) => expo.id !== exhibition.id)
    );
  };

  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ width: 100, height: 200 }}>
          <Tooltip title="edit exhibition" placement="left">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn"
              onClick={() => {
                handleOpenModal("edit", "exhibition", exhibition.id);
              }}
              sx={{ mb: 1 }}
            >
              <Edit sx={{ fontSize: 20 }} />
            </Fab>
          </Tooltip>

          <Tooltip title="delete exhibtion" placement="left">
            <Fab
              color="secondary"
              aria-label="request"
              className="action-btn"
              onClick={handleDeleteExhibition}
              sx={{ mb: 1 }}
            >
              <DeleteForever sx={{ fontSize: 18 }} />
            </Fab>
          </Tooltip>
        </Box>
      </div>
    </>
  );
};
