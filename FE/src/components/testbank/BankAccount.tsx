import React from 'react'
import style from '../../styles/scss/BankAccount.module.scss'
import { useSelector } from 'react-redux';

const BankAccount = () => {
  const accountNumber = useSelector((state: any) => state.account.accountNumber);
  const bankCode = useSelector((state: any) => state.account.bankCode);
  const balance = useSelector((state: any) => state.account.balance);

  return (
    <div className={style.wrapper}>
      <div className={style.account}>
        <div className={style.bank}>
          <div className={style.name}>{bankCode}</div>
          <div className={style.addr}>{accountNumber}</div>
        </div>
        <div className={style.amount}>
          <div className={style.remain}>
            <div>계좌잔액</div>
            <div>{balance} 원</div>
          </div>
          <div className={style.remain}>
            <div>출금가액</div>
            <div>{balance} 원</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankAccount
