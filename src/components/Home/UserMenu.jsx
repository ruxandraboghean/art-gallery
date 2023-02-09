import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function UserMenu() {
  return (
    <>
      <div className="dropdown-menu">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab
            color="secondary"
            aria-label="edit"
            className="dropdown-menu-item"
            onClick={() => {
              signOut(auth);
            }}
          >
            <LogoutIcon />
          </Fab>
        </Box>
      </div>
    </>
  );
}
