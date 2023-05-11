import React, { useState } from "react";
import { HomeNavbar } from "../components/home/HomeNavbar";
import { HomeSidebar } from "../components/home/HomeSidebar";
import { Exhibitions } from "./exhibition/Exhibitions";
import { Messages } from "./chat/Messages";
import { Artists } from "./users/Artists";
import { Profile } from "./users/Profile";
import { ManageArtworks } from "./artwork/ManageArtworks";
import { useEffect } from "react";

//notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home = () => {
  const [currentMenuItem, setCurrentMenuItem] = useState(
    localStorage.getItem("currentMenuItem")
  );
  const [isOpenArtwork, setIsOpenArtwork] = useState(false);
  const [artworkId, setArtworkId] = useState(null);
  const [isMenuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasDisplayedMessage, setHasDisplayedMessage] = useState(false);

  const handleOpenModal = (action, type, id) => {
    setArtworkId(id);
    if (type === "artwork") {
      setIsOpenArtwork(true);
      return id;
    }
  };

  useEffect(() => {
    localStorage.setItem("currentMenuItem", currentMenuItem);

    if (isSuccess && !hasDisplayedMessage) {
      toast.success("Action successfully completed!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setHasDisplayedMessage(true);
    }
  }, [currentMenuItem, isSuccess, hasDisplayedMessage]);

  return (
    <div className="home">
      <HomeSidebar setCurrentMenuItem={setCurrentMenuItem} />
      <div className="content">
        <HomeNavbar
          setCurrentMenuItem={setCurrentMenuItem}
          setIsOpenArtwork={setIsOpenArtwork}
          isOpenArtwork={isOpenArtwork}
          artworkId={artworkId}
          setMenuDropdownOpen={setMenuDropdownOpen}
          isMenuDropdownOpen={isMenuDropdownOpen}
          handleOpenModal={handleOpenModal}
          setIsSuccess={setIsSuccess}
          setHasDisplayedMessage={setHasDisplayedMessage}
        />
        <div className="home-container">
          {currentMenuItem === "messages" ? (
            <Messages />
          ) : currentMenuItem === "artists" ? (
            <Artists />
          ) : currentMenuItem === "profile" ? (
            <Profile />
          ) : currentMenuItem === "manage-artworks" ? (
            <ManageArtworks
              isOpenArtwork={isOpenArtwork}
              setIsOpenArtwork={setIsOpenArtwork}
              setArtworkId={setArtworkId}
              setMenuDropdownOpen={setMenuDropdownOpen}
              handleOpenModal={handleOpenModal}
            />
          ) : (
            <Exhibitions />
          )}
        </div>
        {isSuccess && <ToastContainer />}
      </div>
    </div>
  );
};
