import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database, ref, onValue, off } from "../../firebase/config";
import { Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import { Carousel } from "react-responsive-carousel";
import { CardProductWrapper } from "./CategoryStyles";

const ProductComponent = () => {
  const [titleData, setTitleData] = useState(null);
  const { titleName } = useParams();

  useEffect(() => {
    const titleRef = ref(database);
    function decodeTitle(title) {
      return title
        .replace(/\(/g, " (")
        .replace(/\)/g, ") ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .replace(/wi fi/i, "wi-fi")
        .replace(/10 9/i, "10.9")
        .replace(/12 9/i, "12.9");
    }

    const handleValueChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allProducts = Object.values(data).flatMap((category) =>
          Object.values(category).flatMap((products) => products)
        );

        const decodedTitle = decodeTitle(titleName);
        console.log(decodeTitle(titleName));
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
        <CardProductWrapper>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
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
                    <img
                      src={image}
                      alt="Product"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "554px",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div style={{ flex: 1, marginLeft: "30px" }}>
              <Typography variant="h5"> {titleData.title}</Typography>
              {titleData.price && (
                <Typography  variant="h6" fontWeight="bold">Ціна: {titleData.price}</Typography>
              )}
              {titleData.capacity && (
                <Typography variant="h6" fontWeight="bold">Оперативна пам'ять: {titleData.capacity}</Typography>
              )}
              {titleData.color && (
                <Typography variant="h6" fontWeight="bold">Колір: {titleData.color}</Typography>
              )}
              {titleData.version && (
                <Typography variant="h6" fontWeight="bold">Версія: {titleData.version}</Typography>
              )}
              {titleData.strapsize && (
                <Typography variant="h6" fontWeight="bold">Розмір ремінця: {titleData.strapsize}</Typography>
              )}
              {titleData.size && (
                <Typography variant="h6" fontWeight="bold">Розмір: {titleData.size}</Typography>
              )}

              {titleData.characteristics && (
                <div style={{ marginTop: "30px" }}>
                  <Typography variant="h6">Характеристики:</Typography>
                  <ul style={{ listStyleType: 'none', paddingInlineStart: 0 }}>
                    {titleData.characteristics.maker && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Виробник:
                        </Typography>
                        {titleData.characteristics.maker}
                      </li>
                    )}
                    {titleData.characteristics.battery && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Живлення та акумулятор:
                        </Typography>
                        {titleData.characteristics.battery}
                      </li>
                    )}
                    {titleData.characteristics.features && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Інші функції та можливості:
                        </Typography>
                        {titleData.characteristics.features}
                      </li>
                    )}
                    {titleData.characteristics.material && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Матеріал корпусу:
                        </Typography>
                        {titleData.characteristics.material}
                      </li>
                    )}
                    {titleData.characteristics.camera && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Камера:
                        </Typography>
                        {titleData.characteristics.camera}
                      </li>
                    )}
                    {titleData.characteristics.display && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Дисплей:
                        </Typography>
                        {titleData.characteristics.display}
                      </li>
                    )}
                    {titleData.characteristics.controller && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Датчики:
                        </Typography>
                        {titleData.characteristics.controller}
                      </li>
                    )}
                    {titleData.characteristics.frontcamera && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Фронтальна камера:
                        </Typography>
                        {titleData.characteristics.frontcamera}
                      </li>
                    )}
                    {titleData.characteristics.sim && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          SIM:
                        </Typography>
                        {titleData.characteristics.sim}
                      </li>
                    )}
                    {titleData.characteristics.video && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Запис відео:
                        </Typography>
                        {titleData.characteristics.video}
                      </li>
                    )}
                    {titleData.characteristics.wirelesstechnologies && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Бездротові технології:
                        </Typography>
                        {titleData.characteristics.wirelesstechnologies}
                      </li>
                    )}
                    {titleData.characteristics.year && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Рік:
                        </Typography>
                        {titleData.characteristics.year}
                      </li>
                    )}
                    {titleData.characteristics.weight && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Вага:
                        </Typography>
                        {titleData.characteristics.weight}
                      </li>
                    )}
                    {titleData.characteristics.size && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Розмір:
                        </Typography>
                        {titleData.characteristics.size}
                      </li>
                    )}
                    {titleData.characteristics.strap && (
                      <li>
                        <Typography variant="body2" fontWeight="bold">
                          Ремінь:
                        </Typography>
                        {titleData.characteristics.strap}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardProductWrapper>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductComponent;
