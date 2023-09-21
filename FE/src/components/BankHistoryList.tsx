import React from 'react';
import style from '../../src/styles/scss/BankHistoryList.module.scss'
import Paper from '@mui/material/Paper';
import BankHistoryItem from './BankHistoryItem';
const BankHistoryList = () => {
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

      <div className={style.label}>
        <div className={style.text}>입출내역 (최신순)</div>
      </div>
      <hr />
      {/* 아이템컴포넌트 map */}
      {[1,1,1].map((item, index) => (
        <div>
          <BankHistoryItem></BankHistoryItem>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default BankHistoryList;
