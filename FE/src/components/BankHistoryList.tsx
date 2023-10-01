import React, { useEffect, useState } from "react";
import style from "../../src/styles/scss/BankHistoryList.module.scss";
import BankHistoryItem from "./BankHistoryItem";
import { transDetailAccount } from "../api/banks";
import { useSelector } from "react-redux";

const BankHistoryList = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [transDetails, setTransDetails] = useState([]);

  useEffect(() => {
    transDetailAccount(
      accessToken,
      (res) => {
        setTransDetails(res.data.data.reverse());
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.label}>
        <div className={style.text}>입출내역 (최신순)</div>
      </div>
      <hr />
      {/* 아이템컴포넌트 map */}
      {transDetails.map((item, index) => (
        <div key={index}>
          <BankHistoryItem item={item}></BankHistoryItem>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BankHistoryList;
