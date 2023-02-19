import React from "react";
import { useState } from "react";
import { AddArtworkForm } from "../components/Gallery/AddArtworkForm";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const AddArtwork = ({ artworkId }) => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="gallery-container">
          <div className="gallery-wrapper">
            <AddArtworkForm artworkId={artworkId} />
          </div>
        </div>
      </div>
    </div>
  );
};
