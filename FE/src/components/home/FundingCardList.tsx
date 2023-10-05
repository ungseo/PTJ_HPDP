import React from "react";
import * as Interfaces from "../../interface/apiDataInterface";
import FundingCard from "./FundingCard";
import style from "../../styles/css/FundingCardList.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface FundingCardListProps {
  items: Interfaces.OutFundingsInfoInterface[];
}

const FundingCardList = (props: FundingCardListProps) => {
  const { items } = props;

  if (items === null || items === undefined) {
    return null;
  }
  return (
    <>
      <Swiper
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
