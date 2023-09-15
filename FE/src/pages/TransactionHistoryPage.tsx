import { useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import PointHistory from "../components/transactionhistory/PointHistory";
import HistoryList from "../components/transactionhistory/HistoryList";

const TransactionHistoryPage = () => {
  return (
    <div>
      <OptionTopbar text="거래내역" />
      <PointHistory totalPoint={123456} yesterdayPoint={450} />
      <HistoryList />
    </div>
  );
};

export default TransactionHistoryPage;
