import React from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import style from "../styles/css/FundingItem.module.css";

import ProgressBar from "./common/ProgressBar";
import { OutFundingsInfoInterface } from "../interface/apiDataInterface";

const FundingItem = ({ item }: { item: OutFundingsInfoInterface }) => {
  const navigate = useNavigate();

  // dday는 마감이거나 숫자이므로 숫자일 경우 'D-'를 넣는다.
  const formatDday = item.dday !== "마감" ? `D-${item.dday}` : item.dday;

  const handleGoFundingDetail = () => {
    navigate(`/funding/detail/${item.fundingId}`);
  };

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
          <div className={style.remaindate}>{formatDday}</div>
          <ProgressBar percent={item.percent || 0} />
          <div className={style.accountdetail}>
            <div className={style.nowaccount}>{item.totalFunding}원</div>
            <div className={style.fundingpercent}>{item.percent}%</div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default FundingItem;
