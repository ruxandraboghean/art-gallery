import { React } from "react";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AddCircle, SettingsSystemDaydream } from "@mui/icons-material";

import addExhibition from "../../images/exhibitions/add-exhibition.png";

import { ArtworkModal } from "../gallery/modals/ArtworkModal";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import { useContext } from "react";

export default function UserSubmenu() {
  const { setCurrentMenuItem, handleOpenModal } =
    useContext(ArtworkModalContext);

  const handleClick = (id) => {
    setCurrentMenuItem(id);
  };
  return (
    <>
      <div className="dropdown-menu">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Link to="#" onClick={() => handleClick("profile")}>
            <Fab color="secondary" aria-label="edit" className="account-btn">
              <AccountCircle />
            </Fab>
          </Link>
          <Link to="#">
            <Fab
              color="secondary"
              aria-label="edit"
              className="account-btn"
              onClick={() => handleOpenModal("add", "artwork", null)}
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
              <img
                src={addExhibition}
                alt="exhibition"
                className="addExhibitionIcon"
              />
            </Fab>
          </Link>

          <Link to="#" onClick={() => handleClick("manage-artworks")}>
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

      {/* <Modal isOpen={isOpenExhibition} id="exhibition">
        <AiIcons.AiOutlineCloseCircle
          onClick={() => handleCloseModal("exhibition")}
          id="close-button"
        />
        <ExhibitionForm />
      </Modal> */}
      <ArtworkModal />
    </>
  );
}
