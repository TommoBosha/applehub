import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUserId } from "../../redux/auth/authSelectors";
import { getDocs } from "firebase/firestore";
import { Box, Container } from "@mui/material";
import styles from "./styles";
import UserAvatar from "../../components/User/UserAvatar/UserAvatar";
import UserInfo from "../../components/User/UserInfo/UserInfo";
import Loader from "../../components/Loader/Loader";
import UserAddress from "../../components/User/UserAddress/UserAddress";

function UserPage() {
  const userId = useSelector(getUserId);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users"),
          where("userId", "==", userId)
        );
        querySnapshot.forEach((doc) => {
          if (doc.id === userId) {
            setUser(doc.data());
          }
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      {user ? (
        <Container sx={styles.container}>
          <Box sx={styles.box}>
            <UserAvatar name={user?.name} avatar={user?.avatarURL} />
            <UserInfo
              name={user?.name}
              email={user?.email}
              phone={user?.phone}
            />
          </Box>
          <Box>
            <UserAddress />
          </Box>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default UserPage;
