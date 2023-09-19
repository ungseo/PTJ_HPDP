import React from "react";
import { OptionTopbar } from "../components/common/TopBar";
import CustomizedTabs from "../components/CustomizedTabs";
import OngoingFunding from "../components/OngoingFunding";
import ExpiredFunding from "../components/ExpiredFunding";

const FundingHistoryPage = () => {
  const tabProps = {
    진행: <OngoingFunding />,
    종료: <ExpiredFunding />,
  };

  return (
    <div>
      <OptionTopbar text="후원내역" />
      <CustomizedTabs tabProps={tabProps} />
    </div>
  );
};

export default FundingHistoryPage;
