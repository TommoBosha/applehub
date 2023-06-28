import React, { useState } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Autoplay, Navigation, Pagination]);

const images = [
  'https://images.unsplash.com/photo-1574602526089-988ac5a80023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
  'https://images.unsplash.com/photo-1616876195047-522271be4e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1608022625050-82683640e5a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1347&q=80',
  'https://images.unsplash.com/photo-1592910147752-5e0bc5f04715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
];

function Slider() {
  // eslint-disable-next-line no-unused-vars
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex);
  };

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      centeredSlides={true}
      loop={true}
      autoplay={{ delay: 3000 }}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={handleSlideChange}
    >
      {images.map((imgPath, index) => (
        <SwiperSlide key={index}>
          <div style={{ paddingTop: '10px' }}>
            <img
              src={imgPath}
              alt={`Slide ${index + 1}`}
              style={{ objectFit: 'cover', height: '300px', width: '100%', display: 'block', margin: '0 auto' }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;