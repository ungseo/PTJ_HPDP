import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "../../styles/css/FundingCardList.module.css";

import * as Interfaces from "../../interface/apiDataInterface";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import FundingCard from "./FundingCard";

interface FundingCardListProps {
  items: Interfaces.OutFundingsInfoInterface[];
}

const FundingCardList = (props: FundingCardListProps) => {
  const { items } = props;
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
        {items.map((card: Interfaces.OutFundingsInfoInterface) => (
          <SwiperSlide key={card.fundingId} style={{ width: "unset" }}>
            <FundingCard card={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FundingCardList;
