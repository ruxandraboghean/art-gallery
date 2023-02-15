import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

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
      <section className="modal">
        <div className="flex">
          <img src={user?.photoURL} alt="Avatar" />
          <h3>{user?.displayName}'s Motto</h3>
          <IoIcons.IoMdCloseCircle
            className="btn-close"
            onClick={handleClose}
          />
        </div>
        <textarea
          type="text"
          id="motto"
          placeholder=" motto"
          name="motto"
          defaultValue={modalData?.motto}
          onChange={handleChange}
        />
        <button className="btn" onClick={handleUpdate}>
          Save Changes
        </button>
      </section>
      <div className="overlay"></div>
    </>
  );
};
