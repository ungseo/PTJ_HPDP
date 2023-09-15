import React from "react";
import style from "../../styles/css/FundingCard.module.css";

const FundingCard = () => {
  return (
    <div className={style.cardtotal}>
      <div className={style.fundingcontent}>
        교통사고로 턱과 다리를 잃은 턱돌이를 도와주세요
      </div>
      <div className={style.companyname}>한국 유기동물복지협회</div>
      <div className={style.processing}>진행 표시</div>
    </div>
  );
};

export default FundingCard;
