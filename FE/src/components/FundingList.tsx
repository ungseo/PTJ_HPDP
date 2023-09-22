import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Interfaces from "../interface/apiDataInterface";
import FundingItem from "./FundingItem";

import { getFundingTotalList } from "../api/funding";

const FundingList = () => {
  const fundingItems = [1, 2, 3, 4, 5, 6];
  const [fundingData, setfundingData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);

  useEffect(() => {
    getFundingTotalList(
      (res) => {
        setfundingData(res.data.data);
        console.log("펀딩API연결");
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div>
      <div>총 1345개의 펀딩이 진행중 입니다</div>

      {fundingItems.map((item) => (
        <FundingItem key={item} />
      ))}
    </div>
  );
};

export default FundingList;
