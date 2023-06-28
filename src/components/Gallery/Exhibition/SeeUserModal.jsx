import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import UserSlider from "../Modals/UserSlider";

export const SeeUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="expo-modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          <AiOutlineCloseCircle className="close_circle" />
        </button>
        <UserSlider user={user} />
      </div>
    </div>
  );
};
