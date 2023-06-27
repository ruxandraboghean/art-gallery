import React from "react";
import ArtworkSlider from "../modals/ArtworkSlider";

export const SeeArtworkModal = ({ isOpen, onClose, artwork }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="expo-modal">
      <div className="modal-content">
        <ArtworkSlider artwork={artwork} onClose={onClose} />
      </div>
    </div>
  );
};
