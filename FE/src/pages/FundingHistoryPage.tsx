import React, { useEffect, useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import CustomizedTabs from "../components/CustomizedTabs";
import OngoingFunding from "../components/OngoingFunding";
import ExpiredFunding from "../components/ExpiredFunding";
import { searchMemberFundingHistory } from "../api/members";
import { useSelector } from "react-redux";
import { OutFundingsInfoInterface } from "../interface/apiDataInterface";

const FundingHistoryPage = () => {
  const token = useSelector((state: any) => state.user.auth.accessToken);
  const [ongoingFunding, setOngoingFunding] = useState<any[]>([]);
  const [endFunding, setEndFunding] = useState<any[]>([]);
  useEffect(() => {
    const getFundingHistory = () => {
      searchMemberFundingHistory(
        token,
        (res) => {
          const fundingRes = res.data.data;
          const IngFunding = fundingRes.filter(
            (funding: OutFundingsInfoInterface) => funding.state !== "END"
          );
          const expiredFunding = fundingRes.filter(
            (funding: OutFundingsInfoInterface) => funding.state === "END"
          );
          setOngoingFunding(IngFunding);
          setEndFunding(expiredFunding);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    getFundingHistory();
  }, []);
  const tabProps = {
    진행: <OngoingFunding itemList={ongoingFunding} />,
    종료: <ExpiredFunding itemList={endFunding} />,
  };
  return (
    <div>
      <OptionTopbar text="후원내역" />
      <CustomizedTabs tabProps={tabProps} />
    </div>
  );
};

export default FundingHistoryPage;
