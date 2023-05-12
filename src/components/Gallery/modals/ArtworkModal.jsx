import React from "react";
import { Modal } from "../../Modal";
import { AddArtworkForm } from "../AddArtworkForm";
import { ArtworkModalContext } from "../../../context/ArtworkModalContext";
import { useContext } from "react";

export const ArtworkModal = () => {
  const { setIsOpenArtwork, isOpenArtwork } = useContext(ArtworkModalContext);

  const handleCloseModal = (id) => {
    if (id === "artwork") {
      setIsOpenArtwork(false);
      return;
    }
  };
  return (
    <>
      <Modal isOpen={isOpenArtwork} id="artwork">
        <button
          className="close_button"
          onClick={() => handleCloseModal("artwork")}
        >
          x
        </button>
        <AddArtworkForm onClose={() => handleCloseModal("artwork")} />
      </Modal>
    </>
  );
};
