import { React, useState } from "react";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { AddCircle } from "@mui/icons-material";

import { Modal } from "../../Modal";
import { ExhibitionForm } from "./ExhibitionForm";

export const AddExhibitionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="dropdown-menu " id="add-exhibition">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab
            color="secondary"
            aria-label="edit"
            className="account-btn add-exhibition-btn"
            onClick={handleOpenModal}
          >
            <AddCircle />
          </Fab>
        </Box>
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal} id="exhibition-modal">
        <ExhibitionForm />
      </Modal>
    </>
  );
};
