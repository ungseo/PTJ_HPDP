import React, { useState, useEffect } from "react";

import { OutFundingsInfoInterface } from "../../interface/apiDataInterface";

import style from "../../styles/css/FundingIntroduce.module.css";

import ParticipateList from "./ParticipateList";
import DetailHashTag from "./DetailHashTag";

const FundingIntroduce = ({ props }: { props: OutFundingsInfoInterface }) => {
  // 원래 props.hashtag는 string으로 들어옴 배열로 넘기기 위해 split
  // 값이 없으면 빈배열[] 저장
  const hashtagList = props.hashtag?.split(", ") || [];

  return (
    <>
      <div className={style.introduce_total}>
        <img src={props.content} alt={props.title} className={style.img} />
      </div>
      <DetailHashTag hashtagList={hashtagList} />
      <hr></hr>
      <ParticipateList />
      <div style={{ height: "3rem" }}></div>
    </>
  );
};

export default FundingIntroduce;
