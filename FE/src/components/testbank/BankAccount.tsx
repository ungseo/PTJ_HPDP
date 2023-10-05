import React, { useEffect } from "react";
import style from "../../styles/scss/BankAccount.module.scss";
import { useSelector } from "react-redux";
import { getAccount } from "../../api/banks";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/account-slice";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BankAccount = () => {
  const dispatch = useDispatch();
  const accountNumber = useSelector(
    (state: any) => state.account.accountNumber
  );
  const bankCode = useSelector((state: any) => state.account.bankCode);
  const balance = formatNumber(
    useSelector((state: any) => state.account.balance)
  );
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  useEffect(() => {
    getAccount(
      accessToken,
      (res) => {
        dispatch(accountActions.registerAccount(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.account}>
        <div className={style.bank}>
          <div className={style.name}>{bankCode}</div>
          <div className={style.addr}>{accountNumber}</div>
        </div>
        <div className={style.amount}>
          <div className={style.remain1}>
            <div>계좌잔액</div>
            <div>{balance} 원</div>
          </div>
          <div className={style.remain2}>
            <div>출금가액</div>
            <div>{balance} 원</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;
