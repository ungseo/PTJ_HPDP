import React, { useEffect, useState } from "react";
import FundingItem from "./FundingItem";
import { FundingHistoryInterface } from "../interface/profilePageInterface";
import { searchMemberFundingHistory } from "../api/members";
import { useSelector } from "react-redux";

const OngoingFunding = () => {
  const token = useSelector((state: any) => state.user.auth.accessToken);
  const [fundingHistory, setFundingHistory] = useState<any[]>([]);
  // useEffect(() => {
  //   const getFundingHistory = () => {
  //     searchMemberFundingHistory(
  //       token,
  //       (res) => {
  //         console.log(res.data.data);
  //         const allFunding = res.data.data;
  //         setFundingHistory((prev) => [...prev, res.data.data]);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   };
  //   getFundingHistory();
  // }, []);
  return (
    <div>
      {/* {fundingHistory.length ? (
        fundingHistory.map((item, idx) => <FundingItem></FundingItem>)
      ) : (
        <h1>없소용.</h1>
      )} */}
    </div>
  );
};

export default OngoingFunding;
