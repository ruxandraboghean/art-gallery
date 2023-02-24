import React from "react";
import { useNavigate } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Fab } from "@mui/material";

export const AddCategoryBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-category");
  };
  return (
    <>
      <div className="actions-dropdown-menu">
        <Box sx={{ width: 100, height: 200 }}>
          <Fab
            color="secondary"
            aria-label="edit"
            className="add-category-btn"
            onClick={handleClick}
            sx={{ mb: 1 }}
          >
            <AddCircleIcon sx={{ fontSize: 20 }} />
          </Fab>
        </Box>
      </div>
    </>
  );
};
