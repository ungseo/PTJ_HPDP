import React from "react";
import style from "../../styles/css/ParticipateList.module.css";
import ParticipateItem from "./ParticipateItem";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const ParticipateList = () => {
  const FundingParticipants = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];

  return (
    <div className={style.participants_list}>
      <div className={style.textcontent}>
        <div className={style.first}>후원 목록</div>
        <div className={style.second}>전체 10명</div>
      </div>
      <div className={style.participants_swiper}>
        <Swiper
          // {TypeScript 타입 체크를 우회하기 위한 목적}
          {...{
            slidesPerView: "auto",
            spaceBetween: 10,
            freeMode: true,
            slidesOffsetBefore: 10,
            slidesOffsetAfter: 10,
            pagination: {
              clickable: true,
            },
          }}
          className={style.mySwiper}
        >
          {FundingParticipants.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{ width: "unset", zIndex: 1 }}
              className={style.participant_item}
            >
              <ParticipateItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ParticipateList;
