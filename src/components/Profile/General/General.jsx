import React, { useEffect } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

import { Instagram, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";

import { UserInfoModal } from "./UserInfoModal";
import { BiographyModal } from "./BiographyModal";
import { SocialLinksModal } from "./SocialLinksModal";
import { useState } from "react";

export const General = ({ currentUser }) => {
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenBiographyModal, setIsOpenBiographyModal] = useState(false);
  const [isOpenSocialLinksModal, setIsOpenSocialLinksModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentTab, setCurrentTab] = useState("user-info");

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
                currentTab === "user-info" ? "tab-selected" : "false"
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
                setIsOpen={setIsOpenInfoModal}
              />
            )}
          </div>
          <div className="details-header-item">
            <span
              className={`details-span ${
                currentTab === "biography" ? "tab-selected" : "false"
              }`}
              onClick={() => setCurrentTab("biography")}
            >
              Biography
            </span>
            <FaIcons.FaEdit
              className="edit-btn"
              onClick={() => setIsOpenBiographyModal(!isOpenBiographyModal)}
            />
            {isOpenBiographyModal && (
              <BiographyModal
                user={currentUser}
                userData={userData}
                setIsOpen={setIsOpenBiographyModal}
              />
            )}
          </div>
          <div className="details-header-item">
            <span
              className={`details-span ${
                currentTab === "social-links" ? "tab-selected" : "false"
              }`}
              onClick={() => setCurrentTab("social-links")}
            >
              Social Links
            </span>
            <FaIcons.FaEdit
              className="edit-btn"
              onClick={() => setIsOpenSocialLinksModal(!isOpenSocialLinksModal)}
            />
            {isOpenSocialLinksModal && (
              <SocialLinksModal
                user={currentUser}
                userData={userData}
                setIsOpen={setIsOpenSocialLinksModal}
              />
            )}
          </div>
        </div>
        <div className="details-content">
          {currentTab === "social-links" ? (
            <>
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
            </>
          ) : currentTab === "biography" ? (
            <>
              <span className="details-span">{userData?.biography} </span>
            </>
          ) : (
            <>
              <span className="details-span">
                Username: {userData?.displayName}
              </span>
              <span className="details-span">E-mail: {userData?.email}</span>
              <span className="details-span">Address: {userData?.address}</span>
              <span className="details-span">City: {userData?.city}</span>
              <span className="details-span">Country: {userData?.country}</span>
              <span className="details-span">Phone: {userData?.phone}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};
