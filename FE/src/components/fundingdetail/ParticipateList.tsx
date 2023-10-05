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
      },
      (err) => {
        console.log(err);
      }
    );
  }, [fundingId]);

  return (
    <div className={style.participants_list}>
      <div className={style.textcontent}>
        <div className={style.first}>후원 목록</div>
        <div className={style.second}>{participantData.length}명</div>
      </div>
      <div className={style.participants_swiper}>
        <Swiper
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
              <ParticipateItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ParticipateList;
