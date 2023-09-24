import style from "../../styles/css/TransactionList.module.css";
import DeepBlueBtn from "../common/DeepBlueBtn";
import DefaultButton from "../common/DefaultButton";

const TransactionList = () => {
  const 함수 = (() => {

  })
  
  return (
    <div className={style.wrapper}>
      <div className={style.item}>
        <img src="/americano.png" alt="아메리카노" />
        <p className={style.title}>아메리카노</p>
        <p className={style.price}>780원</p>
        <DeepBlueBtn
          text="소비하기"
          styles={{
            width: "65%",
            borderRadius: "0.6rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={함수}
        />
      </div>
      <div className={style.item}>
        <img src="/candy.png" alt="아메리카노" />
        <p className={style.title}>허니브레드</p>
        <p className={style.price}>780원</p>
        <DeepBlueBtn
          text="소비하기"
          styles={{
            width: "65%",
            borderRadius: "0.6rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        />
      </div>{" "}
      <div className={style.item}>
        <img src="/hpdpLogo.png" alt="아메리카노" />
        <p className={style.title}>용돈... 달다...</p>
        <p className={style.price}>780원</p>
        <DefaultButton
          text="입금하기"
          styles={{
            width: "65%",
            borderRadius: "0.6rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        />
      </div>{" "}
      <div className={style.item}>
        <img src="/salary.png" alt="아메리카노" />
        <p className={style.title}>월급... 달다...</p>
        <p className={style.price}>780원</p>
        <DefaultButton
          text="입금하기"
          styles={{
            width: "65%",
            borderRadius: "0.6rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        />
      </div>
    </div>
  );
};

export default TransactionList;
