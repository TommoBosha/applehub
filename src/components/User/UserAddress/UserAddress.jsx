import { Box, TextField, Typography } from "@mui/material";
import { styles } from "./styles";

function UserAddress({ userAddresses }) {
  console.log("====================================");
  //   console.log(userAddresses.length);
  console.log("====================================");
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
              </Box>
            );
          }
        )}
      </Box>
    </>
  );
}

export default UserAddress;
