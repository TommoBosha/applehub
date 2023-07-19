import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalRegistration from "./ModalRegistration";
import ModalLogin from "./ModalLogin";

const AuthModal = ({ open, onClose }) => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleRegistrationOpen = () => {
    setIsRegistrationOpen(true);
  };

  const handleRegistrationClose = () => {
    setIsRegistrationOpen(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          minWidth: 300,
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        {isRegistrationOpen ? (
          <ModalRegistration
            handleRegistrationClose={handleRegistrationClose}
          />
        ) : (
          <ModalLogin handleRegistrationOpen={handleRegistrationOpen} />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
