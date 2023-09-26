import React from "react";
import { OutPointHistoryInterface } from "./../interface/apiDataInterface";
import style from "../styles/scss/PointHistoryItem.module.scss";

interface PointHistoryItemProps {
  item: OutPointHistoryInterface;
}

function formatDate(inputDate: string) {
  const formattedDateStr = inputDate.replace(
    /(\d+)년 (\d+)월 (\d+)일 (\d+:\d+:\d+)/,
    "$1-$2-$3T$4"
  );

  const date = new Date(formattedDateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

const PointHistoryItem = (props: PointHistoryItemProps) => {
  const { item } = props;

  const paymentDate = formatDate(item.paymentDate);

  return (
    <div className={style.wrapper}>
      <p className={style.date}>{paymentDate}</p>
      <div className={style.content}>
        <div className={style.content_title}>{item.content}</div>

        {/* {flag ? (
          <div className={style.content_withdraw}> 1,000 원</div>
        ) : ( */}
        <div className={style.content_deposit}> {item.paymentPoint} 원</div>
        {/* )} */}
      </div>
      <p className={style.remain_point}>{item.afterPoint} 원</p>
    </div>
  );
};

export default PointHistoryItem;
