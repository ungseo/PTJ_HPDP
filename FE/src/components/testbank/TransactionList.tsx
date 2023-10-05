import style from "../../styles/css/TransactionList.module.css";
import DeepBlueBtn from "../common/DeepBlueBtn";
import DefaultButton from "../common/DefaultButton";
import { getAccount, transAccount } from "../../api/banks";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/account-slice";
import { NotOkModal } from "../common/AlertModals";

const TransactionList = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const dispatch = useDispatch();

  const balance = useSelector((state: any) => state.account.balance);

  const onClick = (event: any) => {
    const { id } = event.currentTarget;

    const [opponentAccount, depositAmount] = (() => {
      switch (id) {
        case "커피":
          return ["123456789", -780];
        case "사탕":
          return ["987654321", -340];
        case "용돈":
          return ["1357911", 12570];
        case "월급":
          return ["24681012", 123456];
        default:
          return ["", 0];
      }
    })();

    if (balance + depositAmount >= 0) {
      transAccount(
        accessToken,
        id,
        opponentAccount,
        depositAmount,
        (res) => {
          getAccount(
            accessToken,
            (res) => {
              dispatch(accountActions.registerAccount(res.data.data));
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      NotOkModal({
        title: "실패",
        text: "잔액이 부족합니다.",
      });
    }
  };

  const btnStyle = {
    width: "65%",
    borderRadius: "0.6rem",
    height: "2.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };

  return (
    <div className={style.wrapper}>
      <div className={style.item}>
        <img src="/coffee.png" alt="커피" />
        <p className={style.title}>커피</p>
        <p className={style.price}>780 원</p>
        <DeepBlueBtn
          text="소비하기"
          styles={btnStyle}
          onClick={onClick}
          id="커피"
        />
      </div>
      <div className={style.item}>
        <img src="/lollipop.png" alt="사탕" />
        <p className={style.title}>사탕</p>
        <p className={style.price}>340 원</p>
        <DeepBlueBtn
          text="소비하기"
          styles={btnStyle}
          onClick={onClick}
          id="사탕"
        />
      </div>{" "}
      <div className={style.item}>
        <img src="/heart.png" alt="용돈" />
        <p className={style.title}>용돈</p>
        <p className={style.price}>12,570 원</p>
        <DefaultButton
          text="입금하기"
          styles={btnStyle}
          onClick={onClick}
          id="용돈"
        />
      </div>
      <div className={style.item}>
        <img src="/salary.png" alt="월급" />
        <p className={style.title}>월급</p>
        <p className={style.price}>123,456 원</p>
        <DefaultButton
          text="입금하기"
          styles={btnStyle}
          onClick={onClick}
          id="월급"
        />
      </div>
    </div>
  );
};

export default TransactionList;
