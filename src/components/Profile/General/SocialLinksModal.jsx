import React, { useState } from "react";
import * as ImIcons from "react-icons/im";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Instagram, YouTube } from "@mui/icons-material";

export const SocialLinksModal = ({ user, userData, setIsOpen }) => {
  const [modalData, setModalData] = useState({
    instagram: userData?.instagram || "",
    youtube: userData?.youtube || "",
    blog: userData?.blog || "",
  });

  const handleChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const userRef = doc(db, "users", user.uid);
    const docData = {
      uid: user.uid,
      instagram: modalData?.instagram,
      youtube: modalData?.youtube,
      blog: modalData?.blog,
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
    <div>
      <section id="biography-modal">
        <div className="modal-header">
          <button className="close_button" onClick={handleClose}>
            x
          </button>
          <h3>{user?.displayName}'s Links</h3>

          <img src={user?.photoURL} alt="Avatar" />
        </div>

        <div className="modal-content">
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
        <div className="modal-footer">
          <button className="modal-button" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      </section>
      <div className="overlay"></div>
    </div>
  );
};
