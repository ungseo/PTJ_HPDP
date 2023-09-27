import React from "react";
import style from "../../styles/css/FundingComplete.module.css";

interface FundingCompleteProps {
  donationAmount: number;
  title: string;
}

const FundingComplete = ({ donationAmount, title }: FundingCompleteProps) => {
  return (
    <div className={style.completemodal}>
      <div className={style.bgimg}></div>
      <div className={style.bgcontent}>
        <div className={style.innercontent}>
          <div className={style.fundingtitle}>{title} 펀딩에</div>
          <div className={style.fundingcnt}>{donationAmount}P</div>
          <div className={style.fundingtitle}>후원이 완료되었습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default FundingComplete;
