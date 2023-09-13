import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "../../styles/css/FundingCardList.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import FundingCard from "./FundingCard";

const FundingCardList = () => {
  return (
    <>
      <Swiper
        // {TypeScript 타입 체크를 우회하기 위한 목적}
        {...{
          slidesPerView: 2,
          freeMode: true,
          pagination: {
            clickable: true,
          },
        }}
        className={style.mySwiper}
      >
        <SwiperSlide>
          <FundingCard />
        </SwiperSlide>
        <SwiperSlide>
          <FundingCard />
        </SwiperSlide>
        <SwiperSlide>
          <FundingCard />
        </SwiperSlide>
        <SwiperSlide>
          <FundingCard />
        </SwiperSlide>
        <SwiperSlide>
          <FundingCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default FundingCardList;
