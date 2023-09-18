import style from "../../styles/css/TestWallet.module.css";
import DeepBlueBtn from "../common/DeepBlueBtn";
import GreyBtn from "../common/GreyButton";

const TestWallet = () => {
  return (
    <div className={style.wrapper}>
      <p className={style.account}>NH 농협 110-******702</p>
      <p className={style.points}>123,456 원</p>
      <div className={style.buttons}>
        <DeepBlueBtn
          text="거래 내역"
          styles={{ width: "48%", height: "2.5rem", borderRadius: "0.6rem" }}
        />
        <GreyBtn
          text="연결 해제"
          styles={{ width: "48%", height: "2.5rem", borderRadius: "0.6rem" }}
        />
      </div>
    </div>
  );
};

export default TestWallet;
