import React from "react";
import { useNavigate } from "react-router-dom";
import { OutFundingsInfoInterface } from "../../interface/apiDataInterface";
import ProgressBar from "../common/ProgressBar";
import style from "../../styles/css/FundingCard.module.css";

const FundingCard = ({ card }: { card: OutFundingsInfoInterface }) => {
  const navigate = useNavigate();

  const formatDday =
    card.dday !== "마감"
      ? card.dday !== 0
        ? `D-${card.dday}`
        : "오늘마감"
      : card.dday;
  const cardTotalStyle = {
    backgroundImage: `url(${card.thumbnail})`,
  };

  const CardClick = () => {
    navigate(`/funding/detail/${card.fundingId}`);
  };

  return (
    <div className={style.cardtotal} style={cardTotalStyle} onClick={CardClick}>
      <div className={style.fundingcontent}>{card.title}</div>
      <div className={style.companyname}>{card.name}</div>
      <div className={style.downcontent}>
        <div className={style.remaindate}>{formatDday}</div>
        <ProgressBar percent={card.percent || 0} />
        <div className={style.accountdetail}>
          <div className={style.nowaccount}>{card.totalFunding}원</div>
          <div className={style.fundingpercent}>{card.percent}%</div>
        </div>
      </div>
    </div>
  );
};

export default FundingCard;
