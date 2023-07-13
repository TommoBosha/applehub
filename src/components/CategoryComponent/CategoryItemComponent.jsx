import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { styled } from "@mui/system";
import Loader from "../Loader/Loader";

const CardWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const CategoryItemComponent = ({ categoryData }) => {
  return (
    <div>
      {categoryData ? (
        <Grid container spacing={2}>
          {Array.isArray(categoryData) ? (
            categoryData.map((item, index) => (
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
          ) : (
            <p>Invalid categoryData format</p>
          )}
        </Grid>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CategoryItemComponent;