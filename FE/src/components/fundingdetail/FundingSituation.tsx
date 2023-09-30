import React from "react";
import { OutFundingsInfoInterface } from "../../interface/apiDataInterface";
import CircleProgressBar from "../common/CircleProgressBar";
import style from "../../styles/css/FundingSituation.module.css";

// 날짜 형식 변경
function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

// 숫자로 들어오는 값을 3자리마다 ','를 넣어 출력
function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const FundingSituation = ({ props }: { props: OutFundingsInfoInterface }) => {
  // 시작일, 마감일 형식을 변경해 출력
  const startDay = formatDate(props.startDate);
  const endDay = formatDate(props.endDate);

  // 금액 형식 처리
  const targetNumber = formatNumber(props.targetAmount);
  const totalNumber = formatNumber(props.totalFunding);
  return (
    <div>
      <div className={style.period}>
        모금 기간 {startDay} ~ {endDay}
      </div>
      <hr></hr>
      <div className={style.progress}>
        <div className={style.title}>후원 현황</div>
        <div className={style.graph_content}>
          <div className={style.graph}>
            <CircleProgressBar percent={props.percent || 0} />
          </div>
          <div className={style.content}>
            <div className={style.total_account}>
              <div>목표금액</div>
              <div className={style.amount}>{targetNumber} 원</div>
            </div>
            <div className={style.use_acccount}>
              <div>모금금액</div>
              <div className={style.amount}>{totalNumber} 원</div>
            </div>
          </div>
        </div>
      </div>
      <div>사용 내역</div>
    </div>
  );
};

export default FundingSituation;
