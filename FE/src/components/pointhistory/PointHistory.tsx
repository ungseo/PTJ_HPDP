import React from "react";
import { useSelector } from "react-redux";
import { pointHistoryInterface } from "./../../interface/transactionHistoryInterface";
import style from "../../styles/css/PointHistory.module.css";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PointHistory = ({ totalPoint, totalFunding }: pointHistoryInterface) => {
  const isInsert = useSelector((state: any) => state.transHistory.isInsert);
  const styles = { backgroundColor: "#fb788e" };
  const total_Point = formatNumber(totalPoint);
  const total_Funding = formatNumber(totalFunding);

  return (
    <div className={style.wrapper}>
      <div className={style.pointHistory} style={styles}>
        <div className={style.totalPoint}>
          <p>현재 잔여 포인트</p>
          <p>{total_Point} P</p>
        </div>
        <div className={style.yesterdayPoint}>
          <p>전체 후원 금액</p>
          <p>{total_Funding} P</p>
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
