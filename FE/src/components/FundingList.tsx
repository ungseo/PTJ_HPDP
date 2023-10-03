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

  useEffect(() => {
    const hashKeyword = keyword;
    getFundingTotalList(
      hashKeyword,
      1,
      (res) => {
        setFundingTotalData(res.data.data);
      },
      (err) => {
        console.error("펀딩 전체 조회 API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div>
      <div style={{ textAlign: "left", margin: "1rem" }}>
        현재 {fundingTotalData.length}개 프로젝트를 진행하고 있습니다.
      </div>
      <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        {fundingTotalData.length > 0 ? (
          fundingTotalData.map((item) => (
            <FundingItem key={item.fundingId} item={item} />
          ))
        ) : (
          <div>프로젝트가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default FundingList;
