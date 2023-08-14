import React from "react";
import { Grid, CardContent, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { CardWrapper } from "./CategoryStyles";


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
                <Link style={{ color: 'inherit', textDecoration: 'none' }}
                 to={`/product/${item._id}`}>
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