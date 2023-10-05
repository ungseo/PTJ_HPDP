import React from "react";
import { useState, useEffect } from "react";

import * as Interfaces from "../interface/apiDataInterface";
import { getFundingProgress } from "../api/fundings";

import FundingItem from "./FundingItem";

import style from "../../src/styles/scss/CompanySituation.module.scss";
import Grid from "@mui/material/Grid";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface CompanySituationProps {
  item: Interfaces.InSearchCompanyInfoResponseInterface;
}

const CompanySituation = (props: CompanySituationProps) => {
  const { item } = props;
  const companyId = item.companyId;

  // 진행중인 펀딩과 종료된 펀딩을 분리하여 axios 요청 및 저장
  const [companyProgressFundingData, setcompanyProgressFundingData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  const [companyCompleteFundingData, setcompanyCompleteFundingData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  const total_cost = formatNumber(item.amount || 0);

  useEffect(() => {
    getFundingProgress(
      companyId,
      1, // 진행중
      (res) => {
        setcompanyProgressFundingData(res.data.data);
      },
      (err) => {
        console.error("진행 API 호출 실패:", err);
      }
    );
  }, []);

  useEffect(() => {
    getFundingProgress(
      companyId,
      2, // 종료됨
      (res) => {
        setcompanyCompleteFundingData(res.data.data);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  return (
    <div className={style.wrapper}>
      <h2 className={style.text}>모금 현황</h2>
      <Grid container className={style.container}>
        {/* <Grid item xs={1.5}></Grid> */}
        <Grid item xs={12} className={style.item}>
          <div className={style.divide}>
            <div>프로젝트 개수</div>
            <div>{item.fundingsNumber} 개</div>
          </div>
          <div className={style.divide}>
            <div>후원 인원</div>
            <div>{item.participantsNumber} 명</div>
          </div>
          <div className={style.divide}>
            <div>모금 금액</div>
            <div>{total_cost} 원</div>
          </div>
        </Grid>
      </Grid>

      {companyProgressFundingData.length > 0 ? (
        <div className={style.text}>
          <h2>진행 내역</h2>
          <FundingItem
            key={companyProgressFundingData[0].fundingId}
            item={companyProgressFundingData[0]}
          />
        </div>
      ) : null}

      {companyCompleteFundingData.length > 0 ? (
        <div className={style.text}>
          <h2>종료 내역</h2>
          {companyCompleteFundingData.map((item) => (
            <FundingItem key={item.fundingId} item={item} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CompanySituation;
