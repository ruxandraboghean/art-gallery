import { Work } from "../components/Work";
import React from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";
import { paintings } from "../mockData/paintings";

export const Works = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="navbar">
        <HomeNavbar />
        <div className="works-container">
          <div className="works-wrapper">
            {paintings?.map((painting) => (
              <Work painting={painting} key={painting.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
