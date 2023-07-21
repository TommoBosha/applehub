import { Button, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { signUp } from "../../redux/auth/authOperations";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../redux/auth/authSelectors";

export default function ModalRegistration({ handleRegistrationClose }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setError] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const handleRegistrationSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }

    try {
      const signUpResult = dispatch(
        signUp(email, password, name, surname, phone)
      );

      if (signUpResult.error) {
        setError(signUpResult.error);
      }
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Реєстрація
      </Typography>
      <TextField
        label="Ім'я"
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
        label="Номер телефону"
        fullWidth
        sx={{ mb: 5 }}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Електронна адреса"
        fullWidth
        sx={{ mb: 5 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Пароль"
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
        Чи вже є аккаунт?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={handleRegistrationClose}
        >
          Увійти
        </Link>
      </Typography>
    </>
  );
}
