import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as Interfaces from "../interface/apiDataInterface";
import { getFundingTotalList } from "../api/funding";

import FundingItem from "./FundingItem";

const FundingList = () => {
  const [fundingTotalData, setFundingTotalData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);

  useEffect(() => {
    getFundingTotalList(
      (res) => {
        setFundingTotalData(res.data.data);
        console.log("펀딩 전체 조회 API 연결");
      },
      (err) => {
        console.error("펀딩 전체 조회 API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div>
      <div>총 {fundingTotalData.length}개의 펀딩이 진행중 입니다</div>

      {fundingTotalData.map((item) => (
        <FundingItem key={item.fundingId} item={item} />
      ))}
    </div>
  );
};

export default FundingList;
