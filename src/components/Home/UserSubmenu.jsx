import { React, useState } from "react";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AccountCircle, Height } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AddCircle, SettingsSystemDaydream } from "@mui/icons-material";
import { ExhibitionForm } from "../gallery/exhibition/ExhibitionForm";
import { Modal } from "../Modal";
import { AddArtworkForm } from "../gallery/AddArtworkForm";

import addExhibition from "../../images/exhibitions/add-exhibition.png";

import * as AiIcons from "react-icons/ai";
import * as TbIcons from "react-icons/tb";

export default function UserSubmenu() {
  const [isOpenExhibition, setIsOpenExhibition] = useState(false);
  const [isOpenArtwork, setIsOpenArtwork] = useState(false);

  const handleOpenModal = (id) => {
    if (id === "artwork") {
      setIsOpenArtwork(true);
      return;
    }

    setIsOpenExhibition(true);
  };

  const handleCloseModal = (id) => {
    if (id === "artwork") {
      setIsOpenArtwork(false);
      return;
    }

    setIsOpenExhibition(false);
  };

  return (
    <>
      <div className="dropdown-menu">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Link to="/profile">
            <Fab color="secondary" aria-label="edit" className="account-btn">
              <AccountCircle />
            </Fab>
          </Link>
          <Link to="/">
            <Fab
              color="secondary"
              aria-label="edit"
              className="account-btn"
              onClick={() => handleOpenModal("artwork")}
            >
              <AddCircle />
            </Fab>
          </Link>

          <Link to="#">
            <Fab
              color="secondary"
              aria-label="edit"
              className="account-btn"
              onClick={() => handleOpenModal("exhibition")}
            >
              <img src={addExhibition} className="addExhibitionIcon" />
            </Fab>
          </Link>

          <Link to="/manage-artwork">
            <Fab color="secondary" aria-label="edit" className="account-btn">
              <SettingsSystemDaydream />
            </Fab>
          </Link>

          <Link to="#">
            <Fab
              color="secondary"
              aria-label="edit"
              className="account-btn"
              onClick={() => {
                signOut(auth);
              }}
            >
              <LogoutIcon />
            </Fab>
          </Link>
        </Box>
      </div>

      <Modal isOpen={isOpenExhibition} id="exhibition">
        <AiIcons.AiOutlineCloseCircle
          onClick={() => handleCloseModal("exhibition")}
          id="close-button"
        />
        <ExhibitionForm />
      </Modal>
      <Modal isOpen={isOpenArtwork} id="artwork">
        <AiIcons.AiOutlineCloseCircle
          onClick={() => handleCloseModal("artwork")}
          id="close-button"
        />

        <AddArtworkForm onClose={() => handleCloseModal("artwork")} />
      </Modal>
    </>
  );
}
