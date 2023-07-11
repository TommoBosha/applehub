import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { signIn, signUp } from "../../redux/auth/authOperations";

const AuthModal = ({ open = false, onClose }) => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  const handleRegistrationOpen = () => {
    setIsRegistrationOpen(true);
  };

  const handleRegistrationClose = () => {
    setIsRegistrationOpen(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleRegistrationSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    try {
      const signUpResult = await signUp(email, password, name, surname, phone);

      if (signUpResult.error) {
        setError(signUpResult.error);
      }
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  const handleSignInSubmit = async () => {
    try {
      const result = await signIn(email, password);

      if (result === true) {
        alert("Hello!");
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
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
            <TextField
              label="Ім'я пользователя"
              fullWidth
              sx={{ mb: 5 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Прізвище"
              fullWidth
              sx={{ mb: 5 }}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
              label="Телефон пользователя"
              fullWidth
              sx={{ mb: 5 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              sx={{ mb: 5 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Пароль пользователя"
              fullWidth
              sx={{ mb: 5 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Підтвердження пароля"
              fullWidth
              sx={{ mb: 3 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegistrationSubmit}
            >
              Зареєструватись
            </Button>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Чи вже є аккаунт?
              <Link
                component="button"
                variant="body2"
                onClick={handleRegistrationClose}
              >
                Увійти
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Вхід
            </Typography>
            <TextField
              label="Email"
              fullWidth
              sx={{ mb: 5 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Пароль"
              type="password"
              fullWidth
              sx={{ mb: 3 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleSignInSubmit}
            >
              Увійти
            </Button>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Новий користувач?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={handleRegistrationOpen}
              >
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
