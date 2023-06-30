import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { Spinner } from "../../utils/Spinner";
import { Instagram, YouTube } from "@mui/icons-material";
import * as ImIcons from "react-icons/im";

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
    biography: userData?.biography || "",
    instagram: userData?.instagram || "",
    youtube: userData?.youtube || "",
    blog: userData?.blog || "",
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
      biography: modalData?.biography,
      instagram: modalData?.instagram,
      youtube: modalData?.youtube,
      blog: modalData?.blog,
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
          <textarea
            type="text"
            id="biography"
            placeholder=" Tell the world about yourself..."
            name="biography"
            defaultValue={modalData?.biography}
            onChange={handleChange}
          />
          <div className="social-links-input">
            <label htmlFor="instagram">
              <Instagram size="medium" className="instagram" />
            </label>
            <input
              type="text"
              id="instagram"
              placeholder=" instagram link"
              name="instagram"
              defaultValue={modalData?.instagram}
              onChange={handleChange}
            />
          </div>
          <div className="social-links-input">
            <label htmlFor="youtube">
              <YouTube className="youtube" />
            </label>
            <input
              type="text"
              id="youtube"
              placeholder=" youtube link"
              name="youtube"
              defaultValue={modalData?.youtube}
              onChange={handleChange}
            />
          </div>
          <div className="social-links-input">
            <label htmlFor="blog">
              <ImIcons.ImBlog className="blog" />
            </label>
            <input
              type="text"
              id="blog"
              placeholder=" blog link"
              name="blog"
              defaultValue={modalData?.blog}
              onChange={handleChange}
            />
          </div>
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
