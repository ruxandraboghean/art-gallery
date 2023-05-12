import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Box, Fab } from "@mui/material";
import { DeleteForever, RemoveRedEye, EditOutlined } from "@mui/icons-material";

//firebase
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";

export const ActionButtons = ({ artworkId, setIsSuccess }) => {
  const { currentUser } = useContext(AuthContext);
  const { setMenuDropdownOpen, handleOpenModal } =
    useContext(ArtworkModalContext);

  const handleDeleteArtwork = async () => {
    console.log("removing");

    const docRef = doc(db, "artworks", artworkId);

    await deleteDoc(docRef)
      .then(() => console.log("Item deleted successfully"))
      .catch((err) => console.error("Error deleting item: ", err));

    const userDocRef = doc(db, "users", currentUser.uid);

    const userDoc = await getDoc(userDocRef);
    const artworks = userDoc.data().artworks;

    const indexToRemove = artworks.findIndex(
      (artwork) => artwork.id === artworkId
    );

    if (indexToRemove !== -1) {
      let updatedArtworks = artworks.filter(
        (item, index) => index !== indexToRemove
      );

      await updateDoc(userDocRef, { artworks: updatedArtworks });
      setIsSuccess(true);
    }
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
            onClick={() => {
              handleOpenModal("edit", "artwork", artworkId);
              setMenuDropdownOpen(true);
            }}
            sx={{ mb: 1 }}
          >
            <RemoveRedEye sx={{ fontSize: 20 }} />
          </Fab>
          <Link to="/">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn notransition"
              onClick={handleDeleteArtwork}
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
