import React, { useEffect, useState } from "react";
import * as Interfaces from "../interface/apiDataInterface";
import DetailHashTag from "./fundingdetail/DetailHashTag";
import NewsCardList from "./NewsCardList";
import style from "./../styles/scss/CompanyIntroduce.module.scss";

//
import Grid from "@mui/material/Grid";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkIcon from "@mui/icons-material/Link";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "axios";
import { useSelector } from "react-redux";

interface CompanyIntroduceProps {
  item: Interfaces.InSearchCompanyInfoResponseInterface;
}

const CompanyIntroduce = (props: CompanyIntroduceProps) => {
  const { item } = props;

  const hashtagList = item.hashtag?.split(", ") || [];

  const [responseData, setResponseData] = useState<any>([]);

  const [aiData, setAiData] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`https://j9c110.p.ssafy.io/articles/news/${item.name}`, {})
      .then((response) => {
        setResponseData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://j9c110.p.ssafy.io/articles/info/${item.name}`, {})
      .then((response) => {
        setAiData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={style.wrapper}>
      <h2 className={style.container}>벤처 소개</h2>
      <div className={style.field}>
        <div>{item.introduce}</div>
        <DetailHashTag hashtagList={hashtagList} />
      </div>

      <h2 className={style.container}>벤처 정보</h2>
      <Grid container className={style.field}>
        <Grid item xs={1.5} className={style.upper}>
          <WorkOutlineIcon></WorkOutlineIcon>
        </Grid>
        <Grid item xs={10.5} className={style.gap}>
          {item.registrationNumber}
        </Grid>
        <Grid item xs={1.5} className={style.upper}>
          <WhatsAppIcon></WhatsAppIcon>
        </Grid>
        <Grid item xs={10.5} className={style.gap}>
          {item.phoneNumber}
        </Grid>
        <Grid item xs={1.5} className={style.upper}>
          <MailOutlineIcon></MailOutlineIcon>
        </Grid>
        <Grid item xs={10.5} className={style.gap}>
          {item.email}
        </Grid>

        <Grid item xs={1.5} className={style.upper}>
          <LinkIcon></LinkIcon>
        </Grid>
        <Grid item xs={10.5} className={style.gap}>
          {item.websiteUrl}
        </Grid>
        <Grid item xs={1.5} className={style.upper}>
          <BusinessIcon></BusinessIcon>
        </Grid>
        <Grid item xs={10.5} className={style.gap}>
          {item.address}
        </Grid>
      </Grid>
      <div>
        <h2>GPT 소개</h2>
        <div>{aiData}</div>
      </div>
      <div>
        <h2 className={style.container}>관련기사</h2>
        <div>
          <NewsCardList items={responseData}></NewsCardList>
        </div>
      </div>
    </div>
  );
};

export default CompanyIntroduce;
