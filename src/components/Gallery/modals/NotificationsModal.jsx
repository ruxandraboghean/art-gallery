import React from "react";
import { useContext } from "react";
import { ArtworkModalContext } from "../../../context/ArtworkModalContext";
import { Modal } from "../../Modal";
import { Notifications } from "../user/Notifications";

export const NotificationsModal = () => {
  const { setIsOpenNotificationsModal, isOpenNotificationsModal } =
    useContext(ArtworkModalContext);

  const handleCloseModal = () => {
    setIsOpenNotificationsModal(false);
  };
  return (
    <>
      <Modal isOpen={isOpenNotificationsModal} id="notifications">
        <button className="close_button" onClick={() => handleCloseModal()}>
          x
        </button>
        <Notifications onClose={() => handleCloseModal()} />
      </Modal>
    </>
  );
};
