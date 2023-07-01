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
import { ArtworkModalContext } from "../../../context/ArtworkModalContext";
import { RequestContext } from "../../../context/RequestsContext";

export const ConfirmationModal = ({
  id,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
  setIsSuccess,
  type,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { setUserArtworks } = useContext(ArtworkModalContext);
  const { setUserRequests } = useContext(RequestContext);

  const handleOpenConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  const handleDeleteArtwork = async () => {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (type === "artworks") {
      const artworksDocRef = doc(db, "artworks", id);

      //delete from artworks collection
      await deleteDoc(artworksDocRef)
        .then(() => console.log("Item deleted successfully"))
        .catch((err) => console.error("Error deleting item: ", err));

      const userArtworksIds = userDoc.data().artworks;

      const indexToRemove = userArtworksIds.findIndex(
        (artwork) => artwork.id === id
      );

      if (indexToRemove !== -1) {
        let updatedUserArtworks = userArtworksIds.filter(
          (index) => index !== indexToRemove
        );

        await updateDoc(userDocRef, { artworks: updatedUserArtworks });

        await setUserArtworks((prevUserArtworks) =>
          prevUserArtworks.filter((artwork) => artwork.id !== id)
        );
      }
    } else if (type === "requests") {
      const requestsDocRef = doc(db, "requests", id);

      //delete from requests collection
      await deleteDoc(requestsDocRef)
        .then(() => console.log("Item deleted successfully"))
        .catch((err) => console.error("Error deleting item: ", err));

      const userRequestsIds = userDoc.data().requests;

      let updatedUserRequests = userRequestsIds.filter((req) => req.id !== id);

      await updateDoc(userDocRef, { requests: updatedUserRequests });

      await setUserRequests((prevUserRequests) =>
        prevUserRequests.filter((req) => req.id !== id)
      );
    }

    setIsOpenConfirmationModal(false);
    setIsSuccess(true);
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
