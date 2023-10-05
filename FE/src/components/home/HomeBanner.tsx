import React from "react";
import style from "../../styles/css/HomeBanner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
    <div className={style.wrapper}>
      <Swiper {...swiperProps}>
        <SwiperSlide>
          <img src="/1.png" alt="1" className={style.fullWidthImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/2.png" alt="2" className={style.fullWidthImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/3.png" alt="3" className={style.fullWidthImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/4.png" alt="4" className={style.fullWidthImage} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
