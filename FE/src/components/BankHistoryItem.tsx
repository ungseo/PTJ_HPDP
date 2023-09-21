import React from 'react'
import style from '../styles/scss/BankHistoryItem.module.scss'

const BankHistoryItem = () => {
  return (
    <div className={style.wrapper}>
      <p className={style.date}>1999.12.32</p>
      <div className={style.content}>
        <div className={style.content_title}>월급</div>
        <div className={style.content_point}>1234 P</div>
      </div>
      <p className={style.remain_point}>5678 P</p>
    </div>
  )
}

export default BankHistoryItem
