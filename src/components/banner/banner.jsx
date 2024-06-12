import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../css/app.css";
import Banner from "../../../public/images/banner.jpg";
import { Box } from "zmp-ui";

export default function App() {
  return (
    <>
      <Swiper>
        <SwiperSlide>
          <Box className="rounded-md overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={Banner}
            />
          </Box>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
