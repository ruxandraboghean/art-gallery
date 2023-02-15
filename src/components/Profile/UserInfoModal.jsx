import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { updateProfile } from "firebase/auth";

export const UserInfoModal = ({ user, userData, setIsOpen }) => {
  const [modalData, setModalData] = useState({
    displayName: userData?.displayName,
    email: userData?.email,
    password: userData?.password || "",
    photoURL: userData?.photoURL,
    phone: userData?.phone || "",
    city: userData?.city || "",
    country: userData?.country || "",
    address: userData?.address || "",
  });

  const handleChange = (e) => {
    console.log(e.target.name, "target");
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  function updateUserData() {
    console.log(auth.currentUser);
    const user = auth.currentUser;
    updateProfile(user, {
      displayName: modalData?.displayName,
      email: modalData?.email,
      phoneNumber: modalData?.phone,
    })
      .then(() => {
        console.log("Profile updated");
      })
      .catch((error) => {
        console.log(error.message());
      });
  }

  const handleUpdate = async () => {
    const userRef = doc(db, "users", user.uid);
    const docData = {
      uid: user.uid,
      displayName: modalData?.displayName,
      email: modalData?.email,
      phone: modalData?.phone,
      city: modalData?.city,
      country: modalData?.country,
      address: modalData?.address,
    };
    updateUserData();
    await updateDoc(userRef, docData)
      .then(() => {
        console.log("Document updated successfully");
        console.log(modalData.displayName);
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
          <h3>{user?.displayName}'s Profile Info</h3>
          <IoIcons.IoMdCloseCircle
            className="btn-close"
            onClick={handleClose}
          />
        </div>
        <input
          type="text"
          id="username"
          placeholder="username"
          name="displayName"
          defaultValue={modalData?.displayName}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          name="email"
          defaultValue={modalData?.email}
          onChange={handleChange}
        />
        <input
          type="text"
          id="address"
          placeholder="address"
          name="address"
          defaultValue={modalData?.address}
          onChange={handleChange}
        />
        <input
          type="text"
          id="city"
          placeholder="city"
          name="city"
          defaultValue={modalData?.city}
          onChange={handleChange}
        />{" "}
        <input
          type="text"
          id="country"
          placeholder="country"
          name="country"
          defaultValue={modalData?.country}
          onChange={handleChange}
        />
        <input
          type="text"
          id="phone"
          placeholder="phone"
          name="phone"
          defaultValue={modalData?.phone}
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
