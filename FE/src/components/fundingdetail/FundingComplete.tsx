import React from "react";
import { createPortal } from "react-dom";
import style from "../../styles/css/FundingComplete.module.css";

interface FundingCompleteProps {
  donationAmount: number;
}

const FundingComplete = ({ donationAmount }: FundingCompleteProps) => {
  return (
    <div className={style.completemodal}>
      <div className={style.bgimg}></div>
      <div className={style.bgcontent}>
        <div className={style.innercontent}>
          <div className={style.fundingtitle}>
            깨끗한 바다를 꿈꾸는 제주 돌하르방 펀딩에
          </div>
          <div className={style.fundingcnt}>{donationAmount}P</div>
          <div className={style.fundingtitle}>후원이 완료되었습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default FundingComplete;
