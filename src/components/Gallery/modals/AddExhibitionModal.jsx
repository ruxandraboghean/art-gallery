import React, { useContext, useState, useEffect } from "react";
import { Modal } from "../../Modal";
import { ArtworkModalContext } from "../../../context/ArtworkModalContext";
import { AddExhibitionForm } from "../AddExhibitionForm";

export const AddExhibitionModal = () => {
  const { isOpenAddExhibition, setIsOpenAddExhibition } =
    useContext(ArtworkModalContext);

  const handleCloseModal = (id) => {
    if (id === "exhibition") {
      setIsOpenAddExhibition(false);
      return;
    }
  };
  return (
    <>
      <Modal isOpen={isOpenAddExhibition} id="artwork">
        <button
          className="close_button"
          onClick={() => handleCloseModal("exhibition")}
        >
          x
        </button>
        <AddExhibitionForm onClose={() => handleCloseModal("exhibition")} />
      </Modal>
    </>
  );
};
