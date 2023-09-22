import React from "react";
import style from "../../src/styles/scss/CompanySituation.module.scss";
import Grid from "@mui/material/Grid";
import FundingItem from "./FundingItem";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Interfaces from "../interface/apiDataInterface";
import { getFundingProgress } from "../api/funding";

const CompanySituation = () => {
  const [companyfundingData, setcompanyfundingData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  const { companyid } = useParams();

  useEffect(() => {
    getFundingProgress(
      Number(companyid),
      1, // 진행중
      (res) => {
        setcompanyfundingData(res.data.data);
        console.log("진행 펀딩API연결");
      },
      (err) => {
        console.error("진행 API 호출 실패:", err);
      }
    );
  }, []);
  useEffect(() => {
    // Fetching "진행 내역" data
    getFundingProgress(
      Number(companyid),
      2, // 종료됨
      (res) => {
        setcompanyfundingData(res.data.data);
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
            <div>gksk</div>
          </div>
          <div className={style.item}>
            <div>후원 인원</div>
            <div>gksk</div>
          </div>
          <div className={style.item}>
            <div>모금 개수</div>
            <div>gksk</div>
          </div>
          <Grid item xs={1.5} className={style.height}></Grid>
        </Grid>
      </Grid>
      <div className={style.text}>
        <p>진행 내역</p>
        <FundingItem />
      </div>

      <div className={style.text}>
        <p>종료 내역</p>
        {[1, 2].map((item) => (
          <FundingItem key={item} />
        ))}
      </div>
    </div>
  );
};

export default CompanySituation;
