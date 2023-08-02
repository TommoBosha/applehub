import { Box, IconButton, TextField, Typography } from "@mui/material";
import { styles } from "./styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/auth/authSelectors";

function UserAddress({ userAddresses, fetchUser }) {
  const userId = useSelector(getUserId);

  const handleDeleteAddress = async (index) => {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    const userData = userDocSnapshot.data();
    const addresses = userData?.addresses ?? [];

    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);

    await updateDoc(userDocRef, {
      addresses: updatedAddresses,
    });
    fetchUser();
  };
  return (
    <>
      <Box>
        {!userAddresses && (
          <Typography variant="body2">
            Поки не додано жодної Вашої адреси
          </Typography>
        )}
        {userAddresses?.map(
          ({ region, city, street, houseNumber, apartamentNumber }, index) => {
            return (
              <Box sx={styles.boxInfo} key={index}>
                <TextField
                  variant="standard"
                  label="Область"
                  disabled
                  value={region}
                  type="text"
                  sx={styles.textInfo}
                />
                <TextField
                  variant="standard"
                  label="Місто"
                  disabled
                  value={city}
                  type="text"
                  sx={styles.textInfo}
                />
                <TextField
                  variant="standard"
                  label="Вулиця"
                  disabled
                  value={street}
                  type="text"
                  sx={styles.textInfo}
                />
                <TextField
                  variant="standard"
                  label="Номер будинку"
                  disabled
                  value={houseNumber}
                  type="text"
                  sx={styles.textInfo}
                />
                <TextField
                  variant="standard"
                  label="Номер квартири"
                  disabled
                  value={apartamentNumber}
                  type="text"
                  sx={styles.textInfo}
                />
                <IconButton
                  aria-label="update-photo"
                  onClick={() => handleDeleteAddress(index)}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            );
          }
        )}
      </Box>
    </>
  );
}

export default UserAddress;
