import React from "react";
import style from "../../styles/css/FundingCard.module.css";
import { OutFundingsInfoInterface } from "../../interface/apiDataInterface";
import ProgressBar from "../common/ProgressBar";
const FundingCard = ({ card }: { card: OutFundingsInfoInterface }) => {
  const cardTotalStyle = {
    backgroundImage: `url(${card.thumbnail})`,
  };

  return (
    <div className={style.cardtotal} style={cardTotalStyle}>
      <div className={style.fundingcontent}>{card.title}</div>
      <div className={style.companyname}>{card.name}</div>
      <div className={style.downcontent}>
        <ProgressBar percent={card.percent || 0} />
      </div>
    </div>
  );
};

export default FundingCard;
