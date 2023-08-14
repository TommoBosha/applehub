import { Box, IconButton, TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase/config";
import { getUserId } from "../../../redux/auth/authSelectors";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

function UserInfo({ name, email, phone }) {
  const userId = useSelector(getUserId);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone);
  const [updateInputName, setUpdateInputName] = useState(false);
  const [updateInputEmail, setUpdateInputEmail] = useState(false);
  const [updateInputPhone, setUpdateInputPhone] = useState(false);

  const handleUpdateUserName = async () => {
    await updateDoc(doc(db, "users", userId), {
      name: userName,
    });
    setUserName(userName);
    setUpdateInputName(false);
  };

  const handleUpdateUserEmail = async () => {
    await updateDoc(doc(db, "users", userId), {
      email: userEmail,
    });
    setUserEmail(userEmail);
    setUpdateInputEmail(false);
  };

  const handleUpdateUserPhone = async () => {
    await updateDoc(doc(db, "users", userId), {
      phone: userPhone,
    });
    setUserPhone(userPhone);
    setUpdateInputPhone(false);
  };

  const handleChangeInputName = () => {
    setUpdateInputName(true);
  };
  const handleChangeInputEmail = () => {
    setUpdateInputEmail(true);
  };
  const handleChangeInputPhone = () => {
    setUpdateInputPhone(true);
  };

  return (
    <Box sx={styles.box}>
      <Box sx={styles.boxInput}>
        <TextField
          variant="standard"
          label="Ім'я та прізвище"
          value={userName}
          type="text"
          required={updateInputName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={!updateInputName}
          sx={styles.inputDisabled}
        />
        {!updateInputName ? (
          <IconButton
            aria-label="staer-update"
            onClick={handleChangeInputName}
            sx={styles.buttonEdit}
          >
            <CreateOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="done-update"
            onClick={handleUpdateUserName}
            sx={styles.buttonEdit}
          >
            <CheckOutlinedIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={styles.boxInput}>
        <TextField
          variant="standard"
          label="Електронна адреса"
          value={userEmail}
          type="text"
          required={updateInputEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          disabled={!updateInputEmail}
          sx={styles.inputDisabled}
        />
        {!updateInputEmail ? (
          <IconButton
            aria-label="staer-update"
            onClick={handleChangeInputEmail}
            sx={styles.buttonEdit}
          >
            <CreateOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="done-update"
            onClick={handleUpdateUserEmail}
            sx={styles.buttonEdit}
          >
            <CheckOutlinedIcon />
          </IconButton>
        )}
      </Box>
      <Box>
        <TextField
          variant="standard"
          label="Номер телефону"
          value={userPhone}
          type="tel"
          required={updateInputPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          disabled={!updateInputPhone}
          sx={styles.inputDisabled}
        />
        {!updateInputPhone ? (
          <IconButton
            aria-label="staer-update"
            onClick={handleChangeInputPhone}
            sx={styles.buttonEdit}
          >
            <CreateOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="done-update"
            onClick={handleUpdateUserPhone}
            sx={styles.buttonEdit}
          >
            <CheckOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default UserInfo;
