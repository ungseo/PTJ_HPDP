import React, { useState, useEffect } from "react";
import * as Interfaces from "../../interface/apiDataInterface";
import style from "../../styles/css/ParticipateList.module.css";
import ParticipateItem from "./ParticipateItem";
import { getParticipants } from "../../api/fundings";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface ParticipateListProps {
  fundingId: number;
}

const ParticipateList = ({ fundingId }: ParticipateListProps) => {
  const [participantData, setParticipantData] = useState<
    Interfaces.ParticipantsInfo[]
  >([]);

  useEffect(() => {
    getParticipants(
      fundingId,
      (res) => {
        setParticipantData(res.data.data);
        console.log("후원자 API 연결");
      },
      (err) => {
        console.log("후원자 API 호출 실패", err);
      }
    );
  }, [fundingId]);
  console.log(participantData);
  return (
    <div className={style.participants_list}>
      <div className={style.textcontent}>
        <div className={style.first}>후원 목록</div>
        <div className={style.second}>{participantData.length}명</div>
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
          {participantData.map((item) => (
            <SwiperSlide
              key={item.memberId}
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
