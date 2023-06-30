import { createContext, useEffect, useState } from "react";

//notifications
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";
import getAllArtworks from "../data/artworks/getAllArtworks";
import getUsers from "../data/users/getUsers";

export const ArtworkModalContext = createContext();

export const ArtworkModalContextProvider = ({ children }) => {
  const [currentMenuItem, setCurrentMenuItem] = useState(
    localStorage.getItem("currentMenuItem")
  );
  const [userArtworks, setUserArtworks] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [isOpenArtwork, setIsOpenArtwork] = useState(false);
  const [isOpenAddExhibition, setIsOpenAddExhibition] = useState(false);
  const [isOpenNotificationsModal, setIsOpenNotificationsModal] =
    useState(false);
  const [artworkId, setArtworkId] = useState(null);
  const [currentExhibitionId, setCurrentExhibitionId] = useState(null);
  const [isMenuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasDisplayedMessage, setHasDisplayedMessage] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [currentCertifiedArtworkItem, setCurrentCertifiedArtworkItem] =
    useState(null);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [legalValidator, setLegalValidator] = useState(null);
  const [editable, setEditable] = useState(true);
  const [isEditExhibitionAction, setIsEditExhibitionAction] = useState(false);

  injectStyle();

  const handleOpenModal = (action, type, id) => {
    if (type === "artwork") {
      setArtworkId(id);
      setIsOpenArtwork(true);
      return id;
    } else if (type === "notifications") {
      setIsOpenNotificationsModal(true);
    } else if (type === "exhibition") {
      setCurrentExhibitionId(id);
      setIsOpenAddExhibition(true);
      action === "edit" && setIsEditExhibitionAction(true);
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

  useEffect(() => {
    const fetchData = async () => {
      const allArtworks = await getAllArtworks();
      setArtworks(allArtworks);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getLegalValidator = async () => {
      const users = await getUsers();
      const legalValidatorData = users.find(
        (user) => user.role === "validator"
      );
      setLegalValidator(legalValidatorData);
    };

    getLegalValidator();
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
        currentCertifiedArtworkItem,
        setCurrentCertifiedArtworkItem,
        editable,
        setEditable,
        currentArtist,
        setCurrentArtist,
        isOpenAddExhibition,
        setIsOpenAddExhibition,
        legalValidator,
        currentExhibitionId,
        setCurrentExhibitionId,
        isEditExhibitionAction,
      }}
    >
      {children}
    </ArtworkModalContext.Provider>
  );
};
