import React from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import style from "../styles/css/FundingItem.module.css";

import ProgressBar from "./common/ProgressBar";
import { OutFundingsInfoInterface } from "../interface/apiDataInterface";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const FundingItem = ({ item }: { item: OutFundingsInfoInterface }) => {
  const navigate = useNavigate();
  const formatDday =
    item.dday === "0"
      ? "오늘마감"
      : item.dday !== "마감"
      ? `D-${item.dday}`
      : item.dday;

  const total_Funding = formatNumber(item.totalFunding);
  const handleGoFundingDetail = () => {
    navigate(`/funding/detail/${item.fundingId}`);
  };
  console.log(item);
  return (
    <Grid container className={style.total} onClick={handleGoFundingDetail}>
      <Grid item xs={3}>
        <img src={item.thumbnail} alt={item.title} className={style.leftimg} />
      </Grid>
      <Grid item xs={9} className={style.rightcontent}>
        <div className={style.upcontent}>
          <div className={style.fundingcontent}>{item.title}</div>
          <div className={style.companyname}>{item.name}</div>
        </div>
        <div className={style.downcontent}>
          <div className={style.inner_content}>
            <div className={style.accountdetail}>
              <div className={style.fundingpercent}>{item.percent}%</div>
              <div className={style.nowaccount}>{total_Funding}원</div>
            </div>
            <div className={style.remaindate}>{formatDday}</div>
          </div>
          <div className={style.progress_bar}>
            <ProgressBar percent={item.percent || 0} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default FundingItem;
