import React from "react";
import { useState } from "react";
import { ArtworkForm } from "../components/Gallery/ArtworkForm";
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
            <ArtworkForm />
          </div>
        </div>
      </div>
    </div>
  );
};
