import React, { useEffect, useState } from "react";
import * as Interfaces from "../interface/apiDataInterface";
import DetailHashTag from "./fundingdetail/DetailHashTag";
import axios from "axios";
import { useSelector } from "react-redux";
import NewsCardList from "./NewsCardList";
import { newsCrolling } from "../api/news";

interface CompanyIntroduceProps {
  item: Interfaces.InSearchCompanyInfoResponseInterface;
}

const CompanyIntroduce = (props: CompanyIntroduceProps) => {
  const { item } = props;

  const hashtagList = item.hashtag?.split(", ") || [];

  const [responseData, setResponseData] = useState<any>([]);

  useEffect(() => {
    const companyId = item.companyId;
    newsCrolling(
      companyId,
      (res) => {
        console.log("크롤링성공");
        setResponseData(res.data.data);
      },
      (err) => {
        console.log("크롤링실패");
      }
    );
  }, []);

  return (
    <div>
      <h1>벤처 소개</h1>
      <div>{item.introduce}</div>
      <DetailHashTag hashtagList={hashtagList} />

      <h1>벤처 정보</h1>
      <div>사업자 등록 번호: {item.registrationNumber}</div>
      <div>번호: {item.phoneNumber}</div>
      <div>메일: {item.email}</div>
      <div>사이트 접속 주소: {item.websiteUrl}</div>
      <div>주소: {item.address}</div>

      <h1>관련기사</h1>
      <NewsCardList items={responseData}></NewsCardList>
    </div>
  );
};

export default CompanyIntroduce;
