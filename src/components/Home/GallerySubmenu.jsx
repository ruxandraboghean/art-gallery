import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import * as FcIcons from "react-icons/fc";
import {
  AccountCircle,
  AddCircle,
  SettingsSystemDaydream,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function GallerySubmenu({ showSidebar }) {
  return (
    <>
      <div
        className={`dropdown-menu-gallery ${!showSidebar && "hidden-sidebar"}`}
      >
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Link to="/add-artwork">
            <Fab
              color="secondary"
              aria-label="edit"
              className={`add-btn ${!showSidebar && "_add-btn"}`}
            >
              <AddCircle className="add-icon" />
            </Fab>
          </Link>
          <Link to="/manage-artwork">
            <Fab
              color="secondary"
              aria-label="edit"
              className={`account-btn ${!showSidebar && "_account-btn"}`}
            >
              <SettingsSystemDaydream />
            </Fab>
          </Link>
        </Box>
      </div>
    </>
  );
}
