import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function UserMenu() {
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
        </Box>
      </div>
    </>
  );
}
