import React from "react";
import style from "../../styles/css/FundingSituation.module.css";
import CircleProgressBar from "../common/CircleProgressBar";

const FundingSituation = () => {
  return (
    <div>
      <div className={style.period}>모금 기간 2023.07.07 ~ 2023.09.07</div>
      <hr></hr>
      <div className={style.progress}>
        <div className={style.title}>후원 현황</div>
        <div className={style.graph_content}>
          <div className={style.graph}>
            <CircleProgressBar percent={75} />
          </div>
          <div className={style.content}>
            <div className={style.total_account}>
              <div>후원금액</div>
              <div className={style.amount}>200,000,000원</div>
            </div>
            <div className={style.use_acccount}>
              <div>지출금액</div>
              <div className={style.amount}>200,000,000원</div>
            </div>
          </div>
        </div>
      </div>
      <div>사용 내역</div>
    </div>
  );
};

export default FundingSituation;
