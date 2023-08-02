import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUserId } from "../../redux/auth/authSelectors";
import { getDocs } from "firebase/firestore";
import { Box, Button, Container, Typography } from "@mui/material";
import styles from "./styles";
import UserAvatar from "../../components/User/UserAvatar/UserAvatar";
import UserInfo from "../../components/User/UserInfo/UserInfo";
import Loader from "../../components/Loader/Loader";
import AddUserAddress from "../../components/User/UserAddress/AddUserAddress";
import UserAddress from "../../components/User/UserAddress/UserAddress";

function UserPage() {
  const userId = useSelector(getUserId);
  const [user, setUser] = useState(null);
  const [btnAddAddress, setBtnAddAdress] = useState(true);

  const fetchUser = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users"),
      where("userId", "==", userId)
    );
    querySnapshot.forEach((doc) => {
      if (doc.id === userId) {
        setUser(doc.data());
      }
    });
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddAddress = () => {
    setBtnAddAdress(false);
  };

  const closeAddAddress = () => {
    setBtnAddAdress(true);
    fetchUser();
  };

  return (
    <>
      {user ? (
        <Container sx={styles.container}>
          <Box sx={styles.box1}>
            <UserAvatar name={user?.name} avatar={user?.avatarURL} />
            <UserInfo
              name={user?.name}
              email={user?.email}
              phone={user?.phone}
            />
          </Box>
          <Box sx={styles.box2}>
            <Typography variant="h5">Мої адреси:</Typography>
            {!btnAddAddress ? (
              <AddUserAddress closeAddAddress={closeAddAddress} />
            ) : (
              <>
                <UserAddress userAddresses={user?.addresses} />
                <Button
                  sx={styles.button}
                  variant="outlined"
                  onClick={openAddAddress}
                >
                  Додати адресу
                </Button>
              </>
            )}
          </Box>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default UserPage;
