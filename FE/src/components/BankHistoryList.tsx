import React from 'react';
import style from '../../src/styles/scss/BankHistoryList.module.scss'
import BankHistoryItem from './BankHistoryItem';
const BankHistoryList = () => {
  return (
    <div className={style.wrapper}>
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
