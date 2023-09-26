import { OptionTopbar } from "../components/common/TopBar";
import PointHistory from "../components/transactionhistory/PointHistory";
import PointHistoryList from "../components/transactionhistory/PointHistoryList";

const TransactionHistoryPage = () => {
  return (
    <div>
      <OptionTopbar text="거래내역" />
      <PointHistory totalPoint={123456} totalFunding={450} />
      <PointHistoryList />
    </div>
  );
};

export default TransactionHistoryPage;
