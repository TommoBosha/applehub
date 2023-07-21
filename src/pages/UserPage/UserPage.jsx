import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, doc, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUserId } from "../../redux/auth/authSelectors";
import { getDocs } from "firebase/firestore";
import { Avatar, Container, Typography } from "@mui/material";
import styles from "./styles";

function UserPage() {
  const userId = useSelector(getUserId);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users"),
          where("userId", "===", userId)
        );
        querySnapshot.forEach((doc) => {
          // const currentUser

          if (doc.id === userId) {
            setUser(doc.data());
            // setUser(currentUser);
            console.log(doc.id, " => ", doc.data());
            // console.log(currentUser);
          }
        });
        // if (doc.exists) {
        //   setUser(doc.data());
        // } else {
        //   console.log("User not found!");
        // }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  // const { name, surname, email, phone } = user;

  return (
    <Container sx={styles.container}>
      <Avatar alt={user.name} src="../../../public/logo512.png" />
      <Typography>
        {user.name}
        {user.surname}
      </Typography>
      <Typography>{user.email}</Typography>
      <Typography>{user.phone}</Typography>
    </Container>
  );
}

export default UserPage;
