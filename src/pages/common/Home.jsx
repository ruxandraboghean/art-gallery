import React from "react";
import { Exhibitions } from "./exhibition/Exhibitions";
import { Messages } from "./chat/Messages";
import { Artists } from "../users/Artists";
import { Profile } from "../users/Profile";
import { ManageArtworks } from "../users/artworks/ManageArtworks";
import { HomeSidebar } from "../../components/home/HomeSidebar";

//notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//context
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import { useContext } from "react";
import { ArtworkModal } from "../../components/gallery/modals/ArtworkModal";
import { NotificationsModal } from "../../components/gallery/modals/NotificationsModal";
import { ManageRequests } from "../experts/ManageRequests";
import { Artworks } from "./artworks/Artworks";
import { ArtistItem } from "../../components/users/ArtistItem";
import { AddExhibitionModal } from "../../components/gallery/modals/AddExhibitionModal";

export const Home = () => {
  const {
    currentMenuItem,
    setCurrentMenuItem,
    isSuccess,
    isOpenArtwork,
    isOpenNotificationsModal,
    isOpenAddExhibition,
    setIsOpenAddExhibition,
  } = useContext(ArtworkModalContext);

  return (
    <div className="home">
      <HomeSidebar setCurrentMenuItem={setCurrentMenuItem} />
      <div className="content">
        <div className="home-container">
          {currentMenuItem === "home" ? (
            <Exhibitions />
          ) : currentMenuItem === "messages" ? (
            <Messages />
          ) : currentMenuItem === "artists" ? (
            <Artists />
          ) : currentMenuItem === "artworks" ? (
            <Artworks />
          ) : currentMenuItem === "artist" ? (
            <ArtistItem />
          ) : currentMenuItem === "profile" ? (
            <Profile />
          ) : currentMenuItem === "manage-artworks" ? (
            <ManageArtworks />
          ) : currentMenuItem === "manage-requests" ? (
            <ManageRequests />
          ) : (
            <Exhibitions />
          )}
        </div>
        {isSuccess && <ToastContainer />}
      </div>
      {isOpenArtwork && <ArtworkModal />}
      {isOpenNotificationsModal && <NotificationsModal />}
      {isOpenAddExhibition && <AddExhibitionModal />}
    </div>
  );
};
