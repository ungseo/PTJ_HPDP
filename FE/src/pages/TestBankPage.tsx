import { useEffect, useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import TestWallet from "../components/testbank/TestWallet";
import TransactionList from "../components/testbank/TransactionList";
import TestWalletRegistration from './../components/testbank/TestWalletRegistration';
import { useSelector } from "react-redux";

const TestBankPage = () => {

  const isRegistered = useSelector((state: any) => state.account.isRegisterd);

  return (
    <div>
      <OptionTopbar text="test bank" />
      {
        isRegistered
        ? (
          <div>
            <TestWallet />
            <TransactionList />
          </div>
        )
        : (
          <div>
            <TestWalletRegistration />
          </div>
        )
      }
    </div>
  );
};

export default TestBankPage;
