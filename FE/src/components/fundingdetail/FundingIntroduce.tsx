import React, { useRef } from "react";
import { OutFundingsInfoInterface } from "../../interface/apiDataInterface";
import style from "../../styles/css/FundingIntroduce.module.css";
import ParticipateList from "./ParticipateList";
import DetailHashTag from "./DetailHashTag";

const FundingIntroduce = ({ props }: { props: OutFundingsInfoInterface }) => {
  // 원래 props.hashtag는 string으로 들어옴 배열로 넘기기 위해 split
  // 값이 없으면 빈배열[] 저장
  const hashtagList = props.hashtag?.split(", ") || [];

  // 리워드 이미지가 있는 지점
  const rewardImgRef = useRef<HTMLImageElement | null>(null);

  // 리워드 이미지로 이동
  const scrollToRewardImg = () => {
    if (rewardImgRef.current) {
      rewardImgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={style.introduce_total}>
        <div onClick={scrollToRewardImg} className={style.reward}>
          <div>리워드로 이동</div>
        </div>
        <img src={props.content} alt={props.title} className={style.img} />
        <img
          ref={rewardImgRef}
          src={props.rewardImg}
          alt="리워드"
          className={style.img}
        />
      </div>
      <div style={{ marginRight: "1rem", marginLeft: "1rem" }}>
        <DetailHashTag hashtagList={hashtagList} />
      </div>
      <hr></hr>
      <ParticipateList fundingId={props.fundingId} />
      <div style={{ height: "3rem" }}></div>
    </>
  );
};

export default FundingIntroduce;
