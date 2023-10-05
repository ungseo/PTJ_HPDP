import React from "react";
import { OptionTopbar } from "../components/common/TopBar";
import BankHistoryList from "./../components/BankHistoryList";
import BankAccount from "./../components/testbank/BankAccount";

const BankStatementPage = () => {
  return (
    <div>
      <OptionTopbar text="test bank"></OptionTopbar>
      <BankAccount></BankAccount>
      <BankHistoryList></BankHistoryList>
    </div>
  );
};

export default BankStatementPage;
