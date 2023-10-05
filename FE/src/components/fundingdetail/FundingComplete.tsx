import React from "react";
import style from "../../styles/css/FundingComplete.module.css";
import { Icon } from "@iconify/react";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface FundingCompleteProps {
  donationAmount: number;
  title: string;
  thumbnail: string;
}

const FundingComplete = ({
  donationAmount,
  title,
  thumbnail,
}: FundingCompleteProps) => {
  const totalStyle = {
    backgroundImage: `url(${thumbnail})`,
  };
  const donation_account = formatNumber(donationAmount);

  return (
    <div className={style.completemodal}>
      <div className={style.bgimg} style={totalStyle}></div>
      <div className={style.bgcontent}>
        <div className={style.innercontent}>
          <div className={style.fundingtitle}>
            <span style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
              "{title}"
            </span>{" "}
            펀딩에
          </div>
          <div className={style.fundingcnt}>{donation_account}P</div>
          <div className={style.fundingcomplete}>후원이 완료되었습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default FundingComplete;
