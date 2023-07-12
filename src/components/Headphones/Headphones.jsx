import React, { useEffect, useState } from 'react';
import { database, ref, onValue } from '../../firebase/config';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { styled } from '@mui/system';

const headphonesRef = ref(database, "headphones");

const CardWrapper = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MyComponent = () => {
  const [headphonesData, setHeadphonesData] = useState(null);

  useEffect(() => {
    onValue(headphonesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHeadphonesData(data);
      }
    });
  }, []);

  return (
    <div>
      <h1>Headphones</h1>
      {headphonesData ? (
        <Grid container spacing={2}>
          {Object.entries(headphonesData).map(([category, headphonesArray]) => (
            headphonesArray.map((headphone, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <CardWrapper>
                  <CardMedia
                    component="img"
                    height="auto"
                    src={headphone.images[0]}
                    alt="Product"
                  />
                  <CardContent>
                    <Typography variant="h6">{headphone.model}</Typography>
                    <Typography variant="body2">{headphone.title}</Typography>
                    <Typography variant="body2">Ціна: {headphone.price}</Typography>
                  </CardContent>
                </CardWrapper>
              </Grid>
            ))
          ))}
        </Grid>
      ) : (
        <p>Loading headphones data...</p>
      )}
    </div>
  );
};

export default MyComponent;