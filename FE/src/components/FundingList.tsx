import React from "react";
import { useState, useEffect } from "react";

import * as Interfaces from "../interface/apiDataInterface";
import { getFundingTotalList } from "../api/fundings";

import FundingItem from "./FundingItem";
import LoadingSpinner from "./common/LoadingSpinner";
import NullModal from "./common/NullModal";
import style from "../styles/css/FundingList.module.css";
const FundingList = ({ keyword }: any) => {
  const [fundingTotalData, setFundingTotalData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const hashKeyword = keyword;
    getFundingTotalList(
      hashKeyword,
      1,
      (res) => {
        setFundingTotalData(res.data.data);
        setLoading(false);
      },
      (err) => {
        console.error("펀딩 전체 조회 API 호출 실패:", err);
        setLoading(false);
      }
    );
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      {fundingTotalData.length > 0 ? (
        <div style={{ textAlign: "left", margin: "1rem" }}>
          현재 {fundingTotalData.length}개 프로젝트를 진행하고 있습니다.
        </div>
      ) : null}
      <div
        style={{ marginLeft: "1rem", marginRight: "1rem" }}
        className={style.wrapper}
      >
        {fundingTotalData.length > 0 ? (
          fundingTotalData.map((item) => (
            <FundingItem key={item.fundingId} item={item} />
          ))
        ) : (
          <NullModal text="프로젝트가 없습니다." />
        )}
      </div>
    </div>
  );
};

export default FundingList;
