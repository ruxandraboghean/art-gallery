import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const MottoModal = ({ user, userData, setIsOpen }) => {
  const [modalData, setModalData] = useState({
    motto: userData?.motto || "",
  });

  const handleChange = (e) => {
    console.log(e.target.name, "target");
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const userRef = doc(db, "users", user.uid);
    const docData = {
      uid: user.uid,
      motto: modalData?.motto,
    };
    await updateDoc(userRef, docData)
      .then(() => {
        console.log("Document updated successfully");
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });

    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section id="biography-modal">
        <div className="modal-header">
          <button className="close_button" onClick={handleClose}>
            x
          </button>
          <h3>{user?.displayName}'s Motto</h3>
          <img src={user?.photoURL} alt="Avatar" />
        </div>
        <div className="modal-content">
          <textarea
            type="text"
            id="motto"
            placeholder=" motto"
            name="motto"
            defaultValue={modalData?.motto}
            onChange={handleChange}
          />
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      </section>
      <div className="overlay"></div>
    </>
  );
};
