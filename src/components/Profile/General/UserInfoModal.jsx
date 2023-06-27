import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { Spinner } from "../../utils/Spinner";

export const UserInfoModal = ({
  user,
  userData,
  setUserData,
  setIsOpen,
  isLoading,
  setIsLoading,
}) => {
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
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  function updateUserData() {
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
    setIsLoading(true);

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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error: " + err.message);
        setIsLoading(false);
      });

    handleClose();
  };

  const getUserData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const handleClose = () => {
    getUserData();
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <section id="biography-modal">
        <div className="modal-header">
          <button className="close_button" onClick={handleClose}>
            x
          </button>
          <h3>{user?.displayName}'s Profile Info</h3>
          <img src={user?.photoURL} alt="Avatar" />
        </div>
        <div className="modal-content">
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
        </div>
        {isLoading && <Spinner />}
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
