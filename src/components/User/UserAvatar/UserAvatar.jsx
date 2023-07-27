import { Avatar, Box, IconButton, Input } from "@mui/material";
import React, { useRef, useState } from "react";
import { styles } from "./styles";
import { db, storage } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/auth/authSelectors";
import { doc, updateDoc } from "firebase/firestore";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";

function UserAvatar({ name, avatar }) {
  const [image, setImage] = useState(avatar);
  const fileInputRef = useRef(null);
  const userId = useSelector(getUserId);

  const handleAddPhoto = async (e) => {
    const file = e.target.files[0];
    const imageId = Date.now().toString();
    const path = `userAvatars/${userId}/${imageId}.jpeg`;

    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, file);

    const imageURL = await getDownloadURL(ref(storage, imageRef));
    setImage(imageURL);
    await updateDoc(doc(db, "users", userId), {
      avatarURL: imageURL,
    });
  };

  const handleRemovePhoto = async () => {
    await updateDoc(doc(db, "users", userId), {
      avatarURL: null,
    });
    setImage(null);
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Box sx={styles.box}>
        <Avatar variant="square" alt={name} src={image} sx={styles.avatar} />
        <Box sx={styles.boxButton}>
          <Input
            type="file"
            onChange={handleAddPhoto}
            inputRef={fileInputRef}
            style={{ display: "none" }}
          />

          {!image ? (
            <IconButton aria-label="add-photo" onClick={handleFileSelect}>
              <AddAPhotoOutlinedIcon />
            </IconButton>
          ) : (
            <Box>
              <IconButton aria-label="update-photo" onClick={handleFileSelect}>
                <LoopOutlinedIcon />
              </IconButton>
              <IconButton aria-label="remove-photo" onClick={handleRemovePhoto}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default UserAvatar;
