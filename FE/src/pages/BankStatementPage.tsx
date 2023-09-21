import React from 'react'
import { OptionTopbar } from '../components/common/TopBar'
import BankHistoryList from './../components/BankHistoryList';

const BankStatementPage = () => {

  return (
    <div>
      <OptionTopbar text="test bank"></OptionTopbar>

      <BankHistoryList></BankHistoryList>
    </div>
  )
}

export default BankStatementPage
