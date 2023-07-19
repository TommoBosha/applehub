import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database, ref, onValue, off } from "../../firebase/config";
import {  Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Loader from "../Loader/Loader";
import { Carousel } from "react-responsive-carousel";

const CardWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const ProductComponent = () => {
  const [titleData, setTitleData] = useState(null);
  const { titleName } = useParams();

  useEffect(() => {
    const titleRef = ref(database);
    function decodeTitle(title) {
  return title
    .replace(/\(/g, ' (')
    .replace(/\)/g, ') ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
        .replace(/wi fi/i, 'wi-fi')
        .replace(/10 9/i, '10.9')
      .replace(/12 9/i, '12.9')
    
}
   
    

    const handleValueChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allProducts = Object.values(data).flatMap((category) =>
          Object.values(category).flatMap((products) => products)
        );

        const decodedTitle = decodeTitle(titleName);
       console.log(decodeTitle(titleName))
const filteredData = allProducts.find(
  (item) => item.title && item.title.toLowerCase() === decodedTitle
        );
         
        if (filteredData) {
          setTitleData(filteredData);
        }
      }
    };

    onValue(titleRef, handleValueChange);

    return () => {
      off(titleRef, handleValueChange);
    };
  }, [titleName]);


  return (
      <div>
      {titleData ? (
       
         
        <CardWrapper>
          <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showStatus={true}
                    infiniteLoop={true}
            autoPlay={false}
            interval={5000}
            
          >
            {titleData.images.map((image, imageIndex) => (
                      <div key={imageIndex}>
                        <img src={image} alt="Product"  style={{ objectFit: "contain", width: "100%", height: "554px" }} />
                      </div>
                    ))}
            </Carousel>
           
              <CardContent>
                <div>
                  
                  <Typography variant="h4"> {titleData.title}</Typography>
                  <Typography variant="body1">Ціна: {titleData.price}</Typography>
                  <Typography variant="body1">Оперативна пам'ять: {titleData.capacity}</Typography>
                  <Typography variant="body1">Колір: {titleData.color}</Typography>

                  {titleData.characteristics && (
                    <>
                      <p>Характеристики:</p>
                  <ul>
                    {titleData.characteristics.maker && (
                          <li>Виробник: {titleData.characteristics.maker}</li>
                        )}
                        {titleData.characteristics.battery && (
                          <li>Живлення та акумулятор: {titleData.characteristics.battery}</li>
                        )}
                        {titleData.characteristics.features && (
                          <li>Features: {titleData.characteristics.features}</li>
                        )}
                        {titleData.characteristics.material && (
                          <li>Матеріал корпусу: {titleData.characteristics.material}</li>
                    )}
                    {titleData.characteristics.camera && (
                          <li>Камера: {titleData.characteristics.camera}</li>
                    )}
                    {titleData.characteristics.display && (
                          <li>Дисплей: {titleData.characteristics.display}</li>
                    )}
                    {titleData.characteristics.controller && (
                          <li>Датчики: {titleData.characteristics.controller}</li>
                    )}
                    {titleData.characteristics.frontcamera && (
                          <li>Фронтальна камера: {titleData.characteristics.frontcamera}</li>
                    )}
                    {titleData.characteristics.sim && (
                          <li>SIM: {titleData.characteristics.sim}</li>
                    )}
                    {titleData.characteristics.video && (
                          <li>Запис відео: {titleData.characteristics.video}</li>
                    )}
                    {titleData.characteristics.wirelesstechnologies && (
                          <li>Бездротові технології: {titleData.characteristics.wirelesstechnologies}</li>
                    )}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
            </CardWrapper>
          
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductComponent;