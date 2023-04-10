import React from "react";
import { HomeNavbar } from "../../components/home/HomeNavbar";
import { HomeSidebar } from "../../components/home/HomeSidebar";
import { UserProfile } from "../../components/profile/UserProfile";

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
