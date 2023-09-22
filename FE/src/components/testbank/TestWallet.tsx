import { useNavigate } from "react-router";
import style from "../../styles/css/TestWallet.module.css";
import DeepBlueBtn from "../common/DeepBlueBtn";
import GreyBtn from "../common/GreyButton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAccount } from "../../api/bank";

const TestWallet = () => {
  const navigate = useNavigate();

  const userId = useSelector((state: any) => state.user.info.memberId)

  const handleGoStatement = () => {
    navigate(`/profile/bankstatement/${userId}`);
  };
  
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [accountNumber, setAccountNumber] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getAccount(
      accessToken,
      (res) => {
        setAccountNumber(res.data.data.accountNumber)
        setBankCode(res.data.data.bankCode)
        setBalance(res.data.data.Balance)
      },
      (err) => {
        alert(err.message);
      }
    )
  }, []);

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
          text="연결 해제"
          styles={{ width: "48%", height: "2.5rem", borderRadius: "0.6rem" }}
        />
      </div>
    </div>
  );
};

export default TestWallet;
