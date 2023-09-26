import React, { useEffect, useState } from "react";
import * as Interfaces from "../interface/apiDataInterface";
import DetailHashTag from "./fundingdetail/DetailHashTag";
import axios from "axios";
import { useSelector } from "react-redux";
import NewsCardList from "./NewsCardList";

interface CompanyIntroduceProps {
  item: Interfaces.InSearchCompanyInfoResponseInterface;
}

const CompanyIntroduce = (props: CompanyIntroduceProps) => {
  const { item } = props;

  const hashtagList = item.hashtag?.split(", ") || [];

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [responseData, setResponseData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://j9c110.p.ssafy.io:8000/articles/news", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setResponseData(response.data);
        console.log("HTTP 요청 성공:", response.data);
      })
      .catch((error) => {
        console.error("HTTP 요청 실패:", error);
      });
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
