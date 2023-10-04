import { OptionTopbar } from "../components/common/TopBar";
import TestWallet from "../components/testbank/TestWallet";
import TransactionList from "../components/testbank/TransactionList";
import TestWalletRegistration from "./../components/testbank/TestWalletRegistration";
import { useSelector } from "react-redux";

const TestBankPage = () => {
  const isRegistered = useSelector((state: any) => state.account.isRegistered);

  return (
    <div>
      <OptionTopbar text="test bank" />
      {isRegistered ? (
        <div style={{ padding: "1.5rem" }}>
          <TestWallet />
          <TransactionList />
        </div>
      ) : (
        <div style={{ padding: "1.5rem" }}>
          <TestWalletRegistration />
        </div>
      )}
    </div>
  );
};

export default TestBankPage;
