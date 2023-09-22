import React from "react";
import style from "../../styles/css/HomeBanner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const HomeBanner = () => {
  const swiperProps = {
    spaceBetween: 30,
    centeredSlides: true,
    modules: [Autoplay],
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    className: style.totalcontent,
  };

  return (
    <div>
      <Swiper {...swiperProps}>
        <SwiperSlide
          style={{
            backgroundColor: "yellow",
            height: "15rem",
            backgroundImage: "url(/1.png)",
            backgroundSize: "cover",
          }}
        >
          1
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: "blue",
            height: "15rem",
            backgroundImage: "url(/2.png)",
            backgroundSize: "cover",
          }}
        >
          2
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: "red",
            height: "15rem",
            backgroundImage: "url(/3.png)",
            backgroundSize: "cover",
          }}
        >
          3
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: "pink",
            height: "15rem",
            backgroundImage: "url(/4.png)",
            backgroundSize: "cover",
          }}
        >
          4
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
