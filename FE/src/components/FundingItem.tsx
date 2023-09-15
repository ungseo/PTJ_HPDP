import React from "react";
import { Grid } from "@mui/material";
import style from "../styles/css/FundingItem.module.css";
import { useNavigate } from "react-router-dom";

const FundingItem = () => {
  const navigate = useNavigate();

  const handleGoFundingDetail = () => {
    navigate("/fundingdetail");
  };
  return (
    <Grid container className={style.total} onClick={handleGoFundingDetail}>
      <Grid item xs={3} className={style.leftimg}></Grid>
      <Grid item xs={9} className={style.rightcontent}>
        <div className={style.upcontent}>
          <div className={style.fundingcontent}>
            교통사고로 턱과 다리를 잃은 턱돌이를 도와주세요
          </div>
          <div className={style.companyname}>한국 유기동물복지협회</div>
        </div>
        <div className={style.downcontent}>
          <div className={style.processing}>진행 표시</div>
        </div>
      </Grid>
    </Grid>
  );
};

export default FundingItem;
