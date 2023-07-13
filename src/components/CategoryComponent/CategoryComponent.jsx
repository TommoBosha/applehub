import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../../firebase/config";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { styled } from "@mui/system";

const CardWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const CategoryComponent = ({ category }) => {
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const categoryRef = ref(database, category);
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategoryData(data);
      }
    });
  }, [category]);

  return (
    <div>
      <h1>{category}</h1>
      {categoryData ? (
        <Grid container spacing={2}>
          {Object.entries(categoryData).map(([key, items]) =>
            items.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <CardWrapper>
                  <CardMedia
                    component="img"
                    height="auto"
                    src={item.images[0]}
                    alt="Product"
                  />
                  <CardContent>
                    <Typography variant="h6">{item.model}</Typography>
                    <Typography variant="body2">{item.title}</Typography>
                    <Typography variant="body2">Ціна: {item.price}</Typography>
                  </CardContent>
                </CardWrapper>
              </Grid>
            ))
          )}
        </Grid>
      ) : (
        <p>Loading {category} data...</p>
      )}
    </div>
  );
};

export default CategoryComponent;
