import React from 'react'
import style from "../../styles/css/TestWalletRegistration.module.css"
import { Icon } from '@iconify/react'

const TestWalletRegistration = () => {

  const handleClick = () => {
    // 계좌 등록 페이지로 이동
  }

  return (
    <div
      className={style.wrapper}
      onClick={handleClick}
    >
      <p>계좌를 등록해주세요.</p>
      <Icon icon={"bi-plus-circle-dotted"}/>
    </div>
  )
}

export default TestWalletRegistration
