import React, { useEffect } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

import { Instagram, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";

import { UserInfoModal } from "./UserInfoModal";
import { useState } from "react";

export const General = ({ currentUser }) => {
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentTab, setCurrentTab] = useState("user-info");
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="details">
        <div className="details-header">
          <div className="details-header-item">
            <span
              className={`details-span ${
                currentTab === "user-info" ? "" : "false"
              }`}
              onClick={() => setCurrentTab("user-info")}
            >
              User Info
            </span>
            <FaIcons.FaEdit
              className="edit-btn"
              onClick={() => setIsOpenInfoModal(!isOpenInfoModal)}
            />
            {isOpenInfoModal && (
              <UserInfoModal
                user={currentUser}
                userData={userData}
                setUserData={setUserData}
                setIsOpen={setIsOpenInfoModal}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </div>
        </div>
        <div className="details-content">
          <>
            <span className="details-span">
              Username: {userData?.displayName}
            </span>
            <span className="details-span">E-mail: {userData?.email}</span>
            <span className="details-span">Address: {userData?.address}</span>
            <span className="details-span">City: {userData?.city}</span>
            <span className="details-span">Country: {userData?.country}</span>
            <span className="details-span">Phone: {userData?.phone}</span>
            <span className="details-span">{userData?.biography} </span>
            <span>
              <div className="social-links">
                <Link to={userData?.instagram || "#"}>
                  <Instagram
                    size="medium"
                    className="instagram"
                    name="instagram"
                  />
                </Link>
                <Link to={userData?.youtube || "#"}>
                  <YouTube className="youtube" name="youtube" />
                </Link>
                <Link to={userData?.blog || "#"}>
                  <ImIcons.ImBlog className="blog" name="blog" />
                </Link>
              </div>
            </span>
          </>
        </div>
      </div>
    </>
  );
};
