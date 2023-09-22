import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomizedTabs from "../components/CustomizedTabs";
import { useParams } from "react-router-dom";
import CompanyIntroduce from "../components/CompanyIntroduce";
import CompanySituation from "../components/CompanySituation";
import DetailPageTop from "../components/DetailPageTop";

import * as Interfaces from "../interface/apiDataInterface";
import { getCompanyItem } from "../api/companies";

const CompanyDetailPage = () => {
  const [companyItem, setCompanyItem] = useState<
    Interfaces.InSearchCompanyInfoResponseInterface[]
  >([]);
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  console.log(accessToken);
  const { companyid } = useParams();

  useEffect(() => {
    getCompanyItem(
      accessToken,
      Number(companyid),
      (res) => {
        setCompanyItem(res.data.data);
        console.log("기업 상세 API연결");
      },
      (err) => {
        console.error("기업 상세 API 호출 실패:", err);
      }
    );
  }, []);

  const tabProps = {
    소개: <CompanyIntroduce />,
    후원: <CompanySituation />,
  };
  return (
    <>
      <DetailPageTop></DetailPageTop>
      <CustomizedTabs tabProps={tabProps} />
    </>
  );
};

export default CompanyDetailPage;
