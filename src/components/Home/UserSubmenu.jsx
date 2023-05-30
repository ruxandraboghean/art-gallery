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
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import getCurrentUserDetails from "../../data/currentUser/getCurrentUserDetails";

export default function UserSubmenu() {
  const {
    setCurrentMenuItem,
    handleOpenModal,
    hasNewNotification,
    setHasNewNotification,
  } = useContext(ArtworkModalContext);

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const handleClick = (id) => {
    setCurrentMenuItem(id);
    if (id === "notifications") {
      setHasNewNotification(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getCurrentUserDetails(currentUser);
      setUser(userData);
    };

    if (Object.keys(currentUser).length > 0) {
      fetchData();
    }
  }, [currentUser]);

  if (!user) {
    return;
  }

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
                  setCurrentMenuItem("home");
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

          {user?.role === "expert" || user.role === "validator" ? (
            <Link to="#" onClick={() => handleClick("manage-requests")}>
              <Tooltip title="manage requests" placement="right">
                <Fab
                  color="secondary"
                  aria-label="edit"
                  className="account-btn"
                >
                  <SettingsSystemDaydream className="icon" />
                </Fab>
              </Tooltip>
            </Link>
          ) : (
            <Link to="#" onClick={() => handleClick("manage-artworks")}>
              <Tooltip title="manage artworks" placement="right">
                <Fab
                  color="secondary"
                  aria-label="edit"
                  className="account-btn"
                >
                  <SettingsSystemDaydream className="icon" />
                </Fab>
              </Tooltip>
            </Link>
          )}

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
