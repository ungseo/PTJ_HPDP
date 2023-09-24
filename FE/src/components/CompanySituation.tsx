import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as Interfaces from "../interface/apiDataInterface";
import { getFundingProgress } from "../api/funding";

import FundingItem from "./FundingItem";

import style from "../../src/styles/scss/CompanySituation.module.scss";
import Grid from "@mui/material/Grid";

interface CompanySituationProps {
    item: Interfaces.InSearchCompanyInfoResponseInterface;
}

const CompanySituation = (props :CompanySituationProps) => {
  const { item } = props;
  const companyId = item.companyId;

  // 진행중인 펀딩과 종료된 펀딩을 분리하여 axios 요청 및 저장
  const [companyProgressFundingData, setcompanyProgressFundingData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  const [companyCompleteFundingData, setcompanyCompleteFundingData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);

  console.log(companyProgressFundingData)

  useEffect(() => {
    getFundingProgress(
      companyId,
      1, // 진행중
      (res) => {
        setcompanyProgressFundingData(res.data.data);
        console.log(companyProgressFundingData);
        console.log("진행 펀딩API연결");
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
        console.log(companyCompleteFundingData);
        console.log("종료 펀딩API연결");
      },
      (err) => {
        console.error("종료 API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div>
      <div className={style.text}>모금 현황</div>
      <Grid container className={style.total}>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={9} className={style.container}>
          <div className={style.item}>
            <div>프로젝트 개수</div>
            <div>{item.fundingsNumber} 개</div>
          </div>
          <div className={style.item}>
            <div>후원 인원</div>
            <div>{item.participantsNumber} 명</div>
          </div>
          <div className={style.item}>
            <div>모금 금액</div>
            <div>{item.amount} 원</div>
          </div>
          <Grid item xs={1.5} className={style.height}></Grid>
        </Grid>
      </Grid>

      {
        companyProgressFundingData.length > 0
        ? (
          <div className={style.text}>
          <p>진행 내역</p>
            <FundingItem
              key={companyProgressFundingData[0].fundingId}
              item={companyProgressFundingData[0]}
            />
          </div>
        )
        : null
      }

      {
        companyCompleteFundingData.length > 0
        ? (
      <div className={style.text}>
        <p>종료 내역</p>
        {companyCompleteFundingData.map((item) => (
          <FundingItem key={item.fundingId} item={item} />
        ))}
      </div>
        )
        : null        
      }
    </div>
  );
};

export default CompanySituation;
