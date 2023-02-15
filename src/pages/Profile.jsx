import React from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";
import { UserProfile } from "../components/Profile/UserProfile";

export const Profile = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="profile-container">
          <div className="profile-wrapper">
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
};
