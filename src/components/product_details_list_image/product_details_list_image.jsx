import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../css/app.css";

export default function ProductDetailsListImage(data) {
  let { images } = data;

  images = images.reduce((acc, currentValue) => {
    if (!acc.some((image) => image.id === currentValue.id)) {
      acc.push(currentValue);
    }
    return acc;
  }, []);

  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{ height: "300px" }}>
            <img src={image.src} className="h-full object-contain" alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
