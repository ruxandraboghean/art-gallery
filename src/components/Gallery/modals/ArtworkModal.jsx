import React, { useState } from "react";
import { Modal } from "../../Modal";
import { AddArtworkForm } from "../AddArtworkForm";
import { ArtworkModalContext } from "../../../context/ArtworkModalContext";
import { useContext } from "react";

export const ArtworkModal = () => {
  const { setIsOpenArtwork, isOpenArtwork } = useContext(ArtworkModalContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = (id) => {
    if (id === "artwork") {
      setIsOpenArtwork(false);
      return;
    }
    setIsLoading(false);
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
        <AddArtworkForm
          onClose={() => handleCloseModal("artwork")}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};
