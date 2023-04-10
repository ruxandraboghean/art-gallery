import React from "react";
import { AddArtworkForm } from "../../components/gallery/AddArtworkForm";
import { HomeNavbar } from "../../components/home/HomeNavbar";
import { HomeSidebar } from "../../components/home/HomeSidebar";

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
