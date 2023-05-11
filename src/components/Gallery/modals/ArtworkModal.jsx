import React from "react";
import { Modal } from "../../Modal";
import { AddArtworkForm } from "../AddArtworkForm";

export const ArtworkModal = ({
  isOpen,
  setIsOpenArtwork,
  artworkId,
  setIsSuccess,
  setHasDisplayedMessage,
}) => {
  const handleCloseModal = (id) => {
    if (id === "artwork") {
      setIsOpenArtwork(false);
      return;
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} id="artwork">
        <button
          className="close_button"
          onClick={() => handleCloseModal("artwork")}
        >
          x
        </button>
        <AddArtworkForm
          onClose={() => handleCloseModal("artwork")}
          artworkId={artworkId}
          setIsSuccess={setIsSuccess}
          setHasDisplayedMessage={setHasDisplayedMessage}
        />
      </Modal>
    </>
  );
};
