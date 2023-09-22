import React, { useEffect, useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import CustomizedTabs from "../components/CustomizedTabs";
import OngoingFunding from "../components/OngoingFunding";
import ExpiredFunding from "../components/ExpiredFunding";
import { searchMemberFundingHistory } from "../api/members";
import { useSelector } from "react-redux";

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
