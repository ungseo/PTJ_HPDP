import React from "react";
import { OutPointHistoryInterface } from "./../interface/apiDataInterface";
import style from "../styles/scss/PointHistoryItem.module.scss";

interface PointHistoryItemProps {
  item: OutPointHistoryInterface;
}

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

const PointHistoryItem = (props: PointHistoryItemProps) => {
  const { item } = props;
  console.log(item);

  // const createdDate = formatDate(item.createdDate);

  return (
    <div className={style.wrapper}>
      <p className={style.date}>1999.12.32</p>
      <div className={style.content}>
        <div className={style.content_title}>끝전/충전 또는 후원</div>

        {/* {flag ? (
          <div className={style.content_withdraw}> 1,000 원</div>
        ) : ( */}
        <div className={style.content_deposit}> 1,000 원</div>
        {/* )} */}
      </div>
      <p className={style.remain_point}>잔액 : 123,000 원</p>
    </div>
  );
};

export default PointHistoryItem;
