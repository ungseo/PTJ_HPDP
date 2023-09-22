import { OptionTopbar } from "../components/common/TopBar";
import TestWallet from "../components/testbank/TestWallet";
import TransactionList from "../components/testbank/TransactionList";

const TestBankPage = () => {
  return (
    <div>
      <OptionTopbar text="test bank" />
      <TestWallet />
      <TransactionList />
    </div>
  );
};

export default TestBankPage;
