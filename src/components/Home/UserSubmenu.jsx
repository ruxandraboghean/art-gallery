import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AddCircle, SettingsSystemDaydream } from "@mui/icons-material";

export default function UserSubmenu() {
  return (
    <>
      <div className="dropdown-menu">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab
            color="secondary"
            aria-label="edit"
            className="signout-btn"
            onClick={() => {
              signOut(auth);
            }}
          >
            <LogoutIcon />
          </Fab>
          <Link to="/profile">
            <Fab color="secondary" aria-label="edit" className="account-btn">
              <AccountCircle />
            </Fab>
          </Link>
          <Link to="/add-artwork">
            <Fab color="secondary" aria-label="edit" className="account-btn">
              <AddCircle />
            </Fab>
          </Link>
          <Link to="/manage-artwork">
            <Fab color="secondary" aria-label="edit" className="account-btn">
              <SettingsSystemDaydream />
            </Fab>
          </Link>
        </Box>
      </div>
    </>
  );
}
