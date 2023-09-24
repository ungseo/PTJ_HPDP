import { useNavigate } from "react-router";
import style from "../../styles/css/TestWallet.module.css";
import DeepBlueBtn from "../common/DeepBlueBtn";
import GreyBtn from "../common/GreyButton";
import { useSelector } from "react-redux";
import { unregisterAccount } from "../../api/banks";
import { accountActions } from "../../store/account-slice";
import { useDispatch } from "react-redux";

const TestWallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 거래 내역
  const userId = useSelector((state: any) => state.user.info.memberId)

  const handleGoStatement = () => {
    navigate(`/profile/bankstatement/${userId}`);
  };

  // 계좌 해제
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const handleGo = () => {
    // 계좌 해제 axios
    unregisterAccount(
      accessToken,
      (res) => {
        console.log('성공', res)
      },
      (err) => {
        console.log('실패', err)
      }
    )
    // 계좌 해제 redux
    dispatch(accountActions.unregisterAccount())
  };

  const accountNumber = useSelector((state: any) => state.account.accountNumber);
  const bankCode = useSelector((state: any) => state.account.bankCode);
  const balance = useSelector((state: any) => state.account.balance);

  return (
    <div className={style.wrapper}>
      <p className={style.account}>{bankCode} {accountNumber}</p>
      <p className={style.points}>{balance} 원</p>
      <div className={style.buttons}>
        <DeepBlueBtn
          text="거래 내역"
          styles={{ width: "48%", height: "2.5rem", borderRadius: "0.6rem" }}
          onClick={handleGoStatement}
        />
        <GreyBtn
          text="계좌 해제"
          styles={{ width: "48%", height: "2.5rem", borderRadius: "0.6rem" }}
          onClick={handleGo}
        />
      </div>
    </div>
  );
};

export default TestWallet;
