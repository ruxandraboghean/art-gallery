import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

//firebase
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

export const ConfirmationModal = ({
  artworkId,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
  setIsSuccess,
  setArtworks,
}) => {
  const { currentUser } = useContext(AuthContext);

  const handleOpenConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  const handleDeleteArtwork = async () => {
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
      console.log(updatedArtworks, "updated artworks");
      setArtworks(updatedArtworks);
      setIsOpenConfirmationModal(false);
      setIsSuccess(true);
    }
  };

  return (
    <div>
      <Dialog
        open={isOpenConfirmationModal}
        onClose={handleOpenConfirmationModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            fontFamily: "$roboto-mono",
            backgroundColor: "#F3EFFA",
            color: "purple",
            padding: "0.5rem 2.5rem",
            borderRadius: "10px",
          },
          "& .MuiDialogTitle-root": {
            backgroundColor: "#F3EFFA",
            color: "purple",
          },
          "& .MuiDialogContent-root": {
            backgroundColor: "#F3EFFA",
            color: "purple",
          },

          "& .MuiDialogActions-root": {
            backgroundColor: "#F3EFFA",
          },

          "& .MuiButton-root": {
            color: "purple",
          },

          "& Button:first-of-type:hover": {
            backgroundColor: "#B396A8",
            color: "white",
          },
          "& .MuiButton-root:hover": {
            backgroundColor: "#C47A7A",
            color: "white",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this artwork?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteArtwork} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};