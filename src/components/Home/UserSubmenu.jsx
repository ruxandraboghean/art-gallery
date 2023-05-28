import { React } from "react";

import { Box, Fab, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AddCircle, SettingsSystemDaydream } from "@mui/icons-material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

import addExhibition from "../../images/exhibitions/add-exhibition.png";

import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import { useContext } from "react";

export default function UserSubmenu() {
  const {
    setCurrentMenuItem,
    handleOpenModal,
    hasNewNotification,
    setHasNewNotification,
  } = useContext(ArtworkModalContext);

  console.log(hasNewNotification, "@has new notif");

  const handleClick = (id) => {
    setCurrentMenuItem(id);
    if (id === "notifications") {
      setHasNewNotification(false);
    }
  };
  return (
    <>
      <div className="dropdown-menu">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Link to="#">
            <Tooltip title="sign out" placement="right">
              <Fab
                color="secondary"
                aria-label="edit"
                className="account-btn"
                onClick={() => {
                  signOut(auth);
                }}
              >
                <LogoutIcon className="icon" />
              </Fab>
            </Tooltip>
          </Link>

          <Link to="#" onClick={() => handleClick("notifications")}>
            <Tooltip title="notifications" placement="right">
              <Fab
                color="secondary"
                aria-label="edit"
                className="account-btn"
                onClick={() => handleOpenModal("see", "notifications", null)}
              >
                <CircleNotificationsIcon className="icon" />
                {hasNewNotification && <span id="notif__span"></span>}
              </Fab>
            </Tooltip>
          </Link>

          <Link to="#" onClick={() => handleClick("manage-artworks")}>
            <Tooltip title="manage artworks" placement="right">
              <Fab color="secondary" aria-label="edit" className="account-btn">
                <SettingsSystemDaydream className="icon" />
              </Fab>
            </Tooltip>
          </Link>

          <Link to="#">
            <Tooltip title="add exhibition" placement="right">
              <Fab
                color="secondary"
                aria-label="edit"
                className="account-btn"
                onClick={() => handleOpenModal("exhibition")}
              >
                <img src={addExhibition} alt="exhibition" className="icon" />
              </Fab>
            </Tooltip>
          </Link>

          <Link to="#">
            <Tooltip title="add artwork" placement="right">
              <Fab
                color="secondary"
                aria-label="edit"
                className="account-btn"
                onClick={() => handleOpenModal("add", "artwork", null)}
              >
                <AddCircle className="icon" />
              </Fab>
            </Tooltip>
          </Link>

          <Link to="#" onClick={() => handleClick("profile")}>
            <Tooltip title="see profile" placement="right">
              <Fab color="secondary" aria-label="edit" className="account-btn">
                <AccountCircle className="icon" />
              </Fab>
            </Tooltip>
          </Link>
        </Box>
      </div>
    </>
  );
}
