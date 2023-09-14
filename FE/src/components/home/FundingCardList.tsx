import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "../../styles/css/FundingCardList.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import FundingCard from "./FundingCard";

const FundingCardList = () => {
  const fundingCards = [
    { id: 1, title: "Funding Card 1" },
    { id: 2, title: "Funding Card 2" },
    { id: 3, title: "Funding Card 3" },
    { id: 4, title: "Funding Card 4" },
    { id: 5, title: "Funding Card 5" },
  ];

  return (
    <>
      <Swiper
        // {TypeScript 타입 체크를 우회하기 위한 목적}
        {...{
          slidesPerView: "auto",
          spaceBetween: 1,
          freeMode: true,
          slidesOffsetBefore: 10,
          slidesOffsetAfter: 10,
          pagination: {
            clickable: true,
          },
        }}
        className={style.mySwiper}
      >
        {fundingCards.map((card) => (
          <SwiperSlide key={card.id} style={{ width: "unset" }}>
            <FundingCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FundingCardList;
