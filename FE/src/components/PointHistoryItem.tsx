import React, { useState } from "react";
import { OutPointHistoryInterface } from "./../interface/apiDataInterface";
import style from "../styles/scss/PointHistoryItem.module.scss";
import BlockChainInfo from "./BlockChainInfo";
import { Icon } from "@iconify/react";

interface PointHistoryItemProps {
  item: OutPointHistoryInterface;
}

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  const paymentPoint = formatNumber(item.paymentPoint);
  const afterPoint = formatNumber(item.afterPoint);

  const [openBlock, setOpenBlock] = useState(false);
  const OpenBlockModal = () => {
    setOpenBlock(true);
  };
  const CloseBlockModal = () => {
    setOpenBlock(false);
  };

  const content =
    item.content && item.content !== "autopay"
      ? item.content
      : item.content === "autopay"
      ? "끝전 이체"
      : "포인트 충전";
  return (
    <div className={style.wrapper}>
      <p className={style.date}>{paymentDate}</p>
      <div className={style.content}>
        <div className={style.content_title}>{content}</div>
        {item.flag ? (
          <Icon
            icon="bi:receipt-cutoff"
            onClick={OpenBlockModal}
            style={{
              width: "1.3rem",
              height: "1.8rem",
            }}
            className={style.icon}
          ></Icon>
        ) : null}
        {item.flag ? (
          <div className={style.content_withdraw}>{paymentPoint} P</div>
        ) : (
          <div className={style.content_deposit}> {paymentPoint} P</div>
        )}
      </div>
      <div className={style.remain_point}>{afterPoint} P</div>
      {openBlock && (
        <>
          <div className={style.bottomsheetbackground}></div>
          <BlockChainInfo
            onClose={CloseBlockModal}
            historyId={Number(item.pointHistoryId)}
            point={item.paymentPoint}
            date={item.paymentDate}
          />
        </>
      )}
    </div>
  );
};

export default PointHistoryItem;
