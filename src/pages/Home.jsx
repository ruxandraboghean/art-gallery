import React from "react";
import { HomeNavbar } from "../components/home/HomeNavbar";
import { HomeSidebar } from "../components/home/HomeSidebar";
import { Exhibitions } from "./exhibition/Exhibitions";
import { Messages } from "./chat/Messages";
import { Artists } from "./users/Artists";
import { Profile } from "./users/Profile";
import { ManageArtworks } from "./artwork/ManageArtworks";

//notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//context
import { ArtworkModalContext } from "../context/ArtworkModalContext";
import { useContext } from "react";

export const Home = () => {
  const { currentMenuItem, setCurrentMenuItem, isSuccess } =
    useContext(ArtworkModalContext);

  return (
    <div className="home">
      <HomeSidebar setCurrentMenuItem={setCurrentMenuItem} />
      <div className="content">
        <HomeNavbar />
        <div className="home-container">
          {currentMenuItem === "messages" ? (
            <Messages />
          ) : currentMenuItem === "artists" ? (
            <Artists />
          ) : currentMenuItem === "profile" ? (
            <Profile />
          ) : currentMenuItem === "manage-artworks" ? (
            <ManageArtworks />
          ) : (
            <Exhibitions />
          )}
        </div>
        {isSuccess && <ToastContainer />}
      </div>
    </div>
  );
};
