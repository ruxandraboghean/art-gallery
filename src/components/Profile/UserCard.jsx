import { Instagram, YouTube } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import { UserInfoModal } from "./UserInfoModal";
import { MottoModal } from "./MottoModal";
import { BiographyModal } from "./BiographyModal";
import { SocialLinksModal } from "./SocialLinksModal";
import { Link, useNavigate } from "react-router-dom";

export const UserCard = (currentUser) => {
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenMottoModal, setIsOpenMottoModal] = useState(false);
  const [isOpenBiographyModal, setIsOpenBiographyModal] = useState(false);
  const [isOpenSocialLinksModal, setIsOpenSocialLinksModal] = useState(false);
  const [userData, setUserData] = useState(null);

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
    console.log(userData?.instagram, "instaa");
  }, []);

  return (
    <div className="user-card">
      <div className="details">
        <div className="details-header">
          <span className="details-span">User Info</span>
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
          <FaIcons.FaEdit
            className="edit-btn"
            onClick={() => setIsOpenMottoModal(!isOpenMottoModal)}
          />
          {isOpenMottoModal && (
            <MottoModal
              user={currentUser}
              userData={userData}
              setIsOpen={setIsOpenMottoModal}
            />
          )}
        </div>
        <div className="details-content">
          <span className="details-span"> {userData?.motto}</span>
        </div>
      </div>

      <div className="details">
        <div className="details-header">
          <span className="details-span">Biography</span>
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
        <div className="details-content">
          <span className="details-span">{userData?.biography} </span>
        </div>
      </div>

      <div className="details">
        <div className="details-header">
          <span className="details-span">Social Links</span>
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
        <div className="details-content">
          <div className="social-links">
            <Link to={userData?.instagram || "#"}>
              <Instagram size="medium" className="instagram" name="instagram" />
            </Link>
            <Link to={userData?.youtube || "#"}>
              <YouTube className="youtube" name="youtube" />
            </Link>
            <Link to={userData?.blog || "#"}>
              <ImIcons.ImBlog className="blog" name="blog" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
