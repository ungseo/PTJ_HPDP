import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/css/NewsCard.module.css";
import { OutCompanyNewsInterface } from "../interface/apiDataInterface";

const FundingCard = ({ card }: { card: OutCompanyNewsInterface }) => {
  const navigate = useNavigate();

  const cardTotalStyle = {
    backgroundImage: `url(${card.articleProfile})`,
  };

  const CardClick = () => {
    window.location.href = card.articleURL;
  };

  console.log(card);
  return (
    <div className={style.cardtotal} style={cardTotalStyle} onClick={CardClick}>
      <div className={style.fundingcontent}>{card.articleTitle}</div>
    </div>
  );
};

export default FundingCard;
