import { Instagram, YouTube } from "@mui/icons-material";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import { EditModal } from "./EditModal";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export const UserCard = (currentUser) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
      // console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  getUserData();

  return (
    <div className="user-card">
      <div className="details">
        <div className="details-header">
          <span className="details-span">User Info</span>
          <FaIcons.FaEdit
            className="edit-btn"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <EditModal
              user={currentUser}
              userData={userData}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
        <div className="details-content">
          <span className="details-span">
            Username: {userData?.displayName}
          </span>
          <span className="details-span">E-mail: {userData?.email}</span>
          <span className="details-span">Address: {userData?.address}</span>
          <span className="details-span">City: {userData?.city}</span>
          <span className="details-span">Country: {userData?.country}</span>
          <span className="details-span">Phone: {userData?.phone}</span>
        </div>
      </div>

      <div className="details">
        <div className="details-header">
          <span className="details-span">Motto </span>
          <FaIcons.FaEdit className="edit-btn" />
        </div>
        <div className="details-content">
          <span className="details-span"> {userData.motto}</span>
        </div>
      </div>

      <div className="details">
        <div className="details-header">
          <span className="details-span">Biography</span>
          <FaIcons.FaEdit className="edit-btn" />
        </div>
        <div className="details-content">
          <span className="details-span">{userData.biography} </span>
        </div>
      </div>

      <div className="details">
        <div className="details-header">
          <span className="details-span">Social Links</span>
          <FaIcons.FaEdit className="edit-btn" />
        </div>
        <div className="details-content">
          <div className="social-links">
            <Instagram size="medium" className="instagram" />
            <YouTube className="youtube" />
            <ImIcons.ImBlog className="blog" />
          </div>
        </div>
      </div>
    </div>
  );
};
