import { useState } from "react";
import { HistoryListInterface } from "../../interface/transactionHistoryInterface";
import style from "../../styles/css/HistoryList.module.css";
import DefaultButton from "../common/DefaultButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { transHistoryActions } from "../../store/transHistory-slice";
import InsertHistoryItem from "./InsertHistoryItem";
import FundingHistoryItem from "./FundingHistoryItem";
const HistoryList = () => {
  const dispatch = useDispatch();
  const isInsert = useSelector((state: any) => state.transHistory.isInsert);
  const onClick = () => {
    dispatch(transHistoryActions.insertSwitchHandler());
  };
  const buttonProps = {
    text: isInsert ? "후원내역" : "충전내역",
    style: isInsert
      ? { backgroundColor: "#25228C" }
      : { backgroundColor: "#FB788E" },
  };
  //useEffect 사용해서 isInsert가 변할때마다 axiosㅆ
  const InsertDummy = {
    date: "2020-11-03",
    Name: "뭘봐 ㅡㅡ",
    Point: 12000,
    balancePoint: 5000,
  };
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <p>{isInsert ? "충전내역 (최신순)" : "후원내역 (최신순)"}</p>
        <DefaultButton
          text={buttonProps.text}
          styles={buttonProps.style}
          onClick={onClick}
        />
      </div>
      <hr />
      {/* 아이템컴포넌트 map */}
      {isInsert ? (
        <InsertHistoryItem
          date={InsertDummy.date}
          Name={InsertDummy.Name}
          Point={InsertDummy.Point}
          balancePoint={InsertDummy.balancePoint}
        />
      ) : (
        <FundingHistoryItem
          date={InsertDummy.date}
          Name={InsertDummy.Name}
          Point={InsertDummy.Point}
          balancePoint={InsertDummy.balancePoint}
        />
      )}
    </div>
  );
};

export default HistoryList;
