import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "../styles/css/NewsCardList.module.css";

import * as Interfaces from "../interface/apiDataInterface";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import NewsCard from "./NewsCard";

interface NewsCardListProps {
  items: Interfaces.OutCompanyNewsInterface[];
}

const NewsCardList = (props: NewsCardListProps) => {
  const { items } = props;

  return (
    <>
      <Swiper
        // {TypeScript 타입 체크를 우회하기 위한 목적}
        {...{
          slidesPerView: "auto",
          spaceBetween: 10,
          freeMode: true,
          slidesOffsetAfter: 10,
          pagination: {
            clickable: true,
          },
        }}
        className={style.mySwiper}
      >
        {items.map((card: Interfaces.OutCompanyNewsInterface) => (
          <SwiperSlide key={card.articleProfile} style={{ width: "unset" }}>
            <NewsCard card={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default NewsCardList;
