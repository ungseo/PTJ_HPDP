import { OptionTopbar } from "../components/common/TopBar";
import TestWallet from "../components/hpdpbank/TestWallet";
import TransactionList from "../components/hpdpbank/TransactionList";

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
