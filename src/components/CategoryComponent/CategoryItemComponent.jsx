import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const CardWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "rgba(25, 118, 210, 0.1)",
  marginTop: "30px",
   transition: "box-shadow 0.3s ease-in-out", 
  "&:hover": {
    boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.425)", 
  },
}));

const CategoryItemComponent = ({ categoryData }) => {
  return (
    <div>
      {categoryData ? (
        <Grid container spacing={2}>
          {categoryData.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CardWrapper>
                
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                    autoPlay={false}
                    interval={5000}
                  >
                    {item.images.map((image, imageIndex) => (
                      <div key={imageIndex}>
                        <img src={image} alt="Product" />
                      </div>
                    ))}
                </Carousel>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/${encodeURIComponent(item.title.replace(/[.,(),%\s]/g, "-")).toLowerCase()}`}>
                  <CardContent>
                    <Typography variant="h6">{item.model}</Typography>
                    <Typography variant="body2">{item.title}</Typography>
                    <Typography variant="body2">Ціна: {item.price}</Typography>
                  </CardContent>
                </Link>
              </CardWrapper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CategoryItemComponent;