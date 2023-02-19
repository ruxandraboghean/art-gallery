import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const ActionButtons = ({ artworkId }) => {
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate(`/add-artwork/${artworkId}`);
  };
  return (
    <>
      <div className="actions-dropdown-menu notransition">
        <Box sx={{ "& > :not(style)": { m: 2 } }}>
          {/* <Link to="/add-artwork"> */}
          <Fab
            color="secondary"
            aria-label="edit"
            className="action-btn"
            onClick={handleEditButtonClick}
          >
            <ModeEditOutlineIcon />
          </Fab>
          {/* </Link> */}
          <Fab
            color="secondary"
            aria-label="edit"
            className="action-btn"
            onClick={() => console.log("remove")}
          >
            <DeleteIcon />
          </Fab>
          <Link to="/gallery">
            <Fab
              color="secondary"
              aria-label="edit"
              className="action-btn notransition"
            >
              <RemoveRedEyeIcon />
            </Fab>
          </Link>
        </Box>
      </div>
    </>
  );
};
