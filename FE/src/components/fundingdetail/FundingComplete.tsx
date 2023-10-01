import React from "react";
import style from "../../styles/css/FundingComplete.module.css";

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
          <div className={style.fundingcnt}>{donationAmount}P</div>
          <div className={style.fundingcomplete}>후원이 완료되었습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default FundingComplete;
