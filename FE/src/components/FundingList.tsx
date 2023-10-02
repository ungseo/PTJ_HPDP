import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as Interfaces from "../interface/apiDataInterface";
import { getFundingTotalList } from "../api/fundings";

import FundingItem from "./FundingItem";

const FundingList = ({ keyword }: any) => {
  const [fundingTotalData, setFundingTotalData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  console.log(fundingTotalData);

  useEffect(() => {
    const hashKeyword = keyword;
    getFundingTotalList(
      hashKeyword,
      1,
      (res) => {
        setFundingTotalData(res.data.data);
        console.log(hashKeyword);
      },
      (err) => {
        console.error("펀딩 전체 조회 API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div>
      <div style={{ textAlign: "left", margin: "1rem" }}>
        총 {fundingTotalData.length}개의 펀딩이 진행중 입니다
      </div>
      <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        {fundingTotalData.map((item) => (
          <FundingItem key={item.fundingId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FundingList;
