import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Link, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AuthModal = ({ open = false, onClose }) => {
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
          <>
            <Typography variant="h6" gutterBottom>
              Реєстрація
            </Typography>
            <TextField label="Ім'я пользователя" fullWidth sx={{ mb: 5 }} />
            <TextField label="Прізвище" fullWidth sx={{ mb: 5 }} />
            <TextField label="Телефон пользователя" fullWidth sx={{ mb: 5 }} />
            <TextField label="Email" fullWidth sx={{ mb: 5 }} />
            <TextField label="Пароль пользователя" fullWidth sx={{ mb: 5 }} />
            <TextField label="Підтвердження пароля" fullWidth sx={{ mb: 3 }} />
            <Button variant="contained" color="primary" fullWidth>
              Зареєструватись
            </Button>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Чи вже є аккаунт?
              <Link component="button" variant="body2" onClick={handleRegistrationClose}>
                Увійти
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Вхід
            </Typography>
            <TextField label="Ім'я пользователя" fullWidth sx={{ mb: 5 }} />
            <TextField label="Пароль" type="password" fullWidth sx={{ mb: 3 }} />
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
              Увійти
            </Button>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Новий користувач?{" "}
              <Link component="button" variant="body2" onClick={handleRegistrationOpen}>
                Зареєструватись
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;