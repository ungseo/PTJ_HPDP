import React from "react";
import style from "../styles/scss/BankHistoryItem.module.scss";
import { OutSearchSendHistoryInterface } from "./../interface/apiDataInterface";

interface BankHistoryItemProps {
  item: OutSearchSendHistoryInterface;
}

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

const BankHistoryItem = (props: BankHistoryItemProps) => {
  const { item } = props;
  const flag = item.flag;

  const createdDate = formatDate(item.createdDate);

  const depositAmount = Math.abs(item.depositAmount);

  return (
    <div className={style.wrapper}>
      <p className={style.date}>{createdDate}</p>
      <div className={style.content}>
        <div className={style.content_title}>{item.opponentName}</div>

        {flag ? (
          <div className={style.content_withdraw}> {depositAmount}원</div>
        ) : (
          <div className={style.content_deposit}> {depositAmount} 원</div>
        )}
      </div>
      <p className={style.remain_point}>{item.afterBlnc} 원</p>
    </div>
  );
};

export default BankHistoryItem;
