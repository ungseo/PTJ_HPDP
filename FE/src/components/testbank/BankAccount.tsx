import React from 'react'
import style from '../../styles/scss/BankAccount.module.scss'

const BankAccount = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.account}>
        <div className={style.bank}>
          <div className={style.name}>NH농협</div>
          <div className={style.addr}>110-095024-02-702</div>
        </div>
        <div className={style.amount}>
          <div className={style.remain}>
            <div>계좌잔액</div>
            <div>111,000 원</div>
          </div>
          <div className={style.remain}>
            <div>출금가액</div>
            <div>111,000 원</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankAccount
