import { useEffect, useState } from "react";
import style from "../../styles/css/TransactionList.module.css";
import DeepBlueBtn from "../common/DeepBlueBtn";
import DefaultButton from "../common/DefaultButton";
import { transAccount } from "../../api/banks";
import { useSelector } from "react-redux";
import { accountActions } from "../../store/account-slice";

const TransactionList = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const onClick = (event: any) => {
    const { id } = event.currentTarget;

    const [opponentAccount, depositAmount] = (() => {
      switch (id) {
        case 'withdraw1':
          return ['123456789', -780];
        case 'withdraw2':
          return ['987654321', -340];
        case 'deposit1':
          return ['1357911', 12570];
        case 'deposit2':
          return ['24681012', -123456];
        default:
          return ['', 0];
      }
    })();

    transAccount(
      accessToken,
      id,
      opponentAccount,
      depositAmount,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  
  return (
    <div className={style.wrapper}>
      <div className={style.item}>
        <img src="/americano.png" alt="아메리카노" />
        <p className={style.title}>아메리카노</p>
        <p className={style.price}>750원</p>
        <DeepBlueBtn
          text="소비하기"
          styles={{
            width: "65%",
            borderRadius: "0.6rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={onClick}
          id="withdraw1"
        />
      </div>
      <div className={style.item}>
        <img src="/candy.png" alt="허니브레드" />
        <p className={style.title}>허니브레드</p>
        <p className={style.price}>250원</p>
        <DeepBlueBtn
          text="소비하기"
          styles={{
            width: "65%",
            borderRadius: "0.6rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={onClick}
          id="withdraw2"
        />
      </div>{" "}
      <div className={style.item}>
        <img src="/hpdpLogo.png" alt="아메리카노" />
        <p className={style.title}>용돈... 달다...</p>
        <p className={style.price}>150원</p>
        <DefaultButton
          text="입금하기"
          styles={{
            width: "65%",
            borderRadius: "0.6rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={onClick}
          id="deposit1"
        />
      </div>
      <div className={style.item}>
        <img src="/salary.png" alt="아메리카노" />
        <p className={style.title}>월급... 달다...</p>
        <p className={style.price}>850원</p>
        <DefaultButton
          text="입금하기"
          styles={{
            width: "65%",
            borderRadius: "0.6rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={onClick}
          id="deposit2"
        />
      </div>
    </div>
  );
};

export default TransactionList;
