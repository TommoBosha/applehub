import { Button, TextField, Typography, Link } from "@mui/material";
import { useState } from "react";
import { signIn } from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../redux/auth/authSelectors";

export default function ModalLogin({ handleRegistrationOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setError] = useState("");
  const token = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignInSubmit = async () => {
    try {
      const signUpResult = dispatch(signIn(email, password));

      if (signUpResult.error) {
        setError(signUpResult.error);
      }
      if (token) {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Вхід
      </Typography>
      <TextField
        label="Електронна адреса"
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
  );
}
