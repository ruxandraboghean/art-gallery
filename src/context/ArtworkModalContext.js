import { createContext, useEffect, useState } from "react";

//notifications
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAllArtworks from "../data/getAllArtworks";
export const ArtworkModalContext = createContext();

export const ArtworkModalContextProvider = ({ children }) => {
  const [currentMenuItem, setCurrentMenuItem] = useState(
    localStorage.getItem("currentMenuItem")
  );
  const [userArtworks, setUserArtworks] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [isOpenArtwork, setIsOpenArtwork] = useState(false);
  const [isOpenNotificationsModal, setIsOpenNotificationsModal] =
    useState(false);
  const [artworkId, setArtworkId] = useState(null);
  const [isMenuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasDisplayedMessage, setHasDisplayedMessage] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const handleOpenModal = (action, type, id) => {
    setArtworkId(id);

    if (type === "artwork") {
      setIsOpenArtwork(true);
      return id;
    } else if (type === "notifications") {
      setIsOpenNotificationsModal(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("currentMenuItem", currentMenuItem);

    if (isSuccess && !hasDisplayedMessage) {
      toast.success("Action successfully completed!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: "#AF92C6",
          color: "#fff",
        },
      });
      setHasDisplayedMessage(true);
    }
  }, [currentMenuItem, isSuccess, hasDisplayedMessage]);

  const fetchData = async () => {
    const allArtworks = await getAllArtworks();
    setArtworks(allArtworks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ArtworkModalContext.Provider
      value={{
        currentMenuItem,
        setCurrentMenuItem,
        setIsOpenArtwork,
        isOpenArtwork,
        artworkId,
        setMenuDropdownOpen,
        isMenuDropdownOpen,
        handleOpenModal,
        isSuccess,
        setIsSuccess,
        setHasDisplayedMessage,
        artworks,
        setArtworks,
        userArtworks,
        setUserArtworks,
        isOpenNotificationsModal,
        setIsOpenNotificationsModal,
        hasNewNotification,
        setHasNewNotification,
      }}
    >
      {children}
    </ArtworkModalContext.Provider>
  );
};
