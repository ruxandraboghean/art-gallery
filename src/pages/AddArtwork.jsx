import React from "react";
import { ArtworkForm } from "../components/Gallery/ArtworkForm";
import { Buttons } from "../components/Gallery/Buttons";
import { ImageUpload } from "../components/Gallery/ImageUpload";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const AddArtwork = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="gallery-container">
          <div className="gallery-wrapper">
            <ImageUpload />
            <ArtworkForm />
            <Buttons />
          </div>
        </div>
      </div>
    </div>
  );
};
