import React from "react";
import ExhibtionSlider from "../modals/ExhibitionSlider";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const SeeExhibitionModal = ({ isOpen, onClose, artworks }) => {
  if (!isOpen) {
    return null;
  }

  console.log(artworks);

  return (
    <div className="expo-modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          <AiOutlineCloseCircle className="close_circle" />
        </button>
        <ExhibtionSlider artworks={artworks} />
      </div>
    </div>
  );
};
