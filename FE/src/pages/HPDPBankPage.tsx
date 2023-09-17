import { OptionTopbar } from "../components/common/TopBar";
import TestWallet from "../components/hpdpbank/TestWallet";
import TransactionList from "../components/hpdpbank/TransactionList";

const HPDPBankPage = () => {
  return (
    <div>
      <OptionTopbar text="HPDP 은행" />
      <TestWallet />
      <TransactionList />
    </div>
  );
};

export default HPDPBankPage;
