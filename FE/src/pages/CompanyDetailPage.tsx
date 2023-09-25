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
  const [companyItem, setCompanyItem] =
    useState<Interfaces.InSearchCompanyInfoResponseInterface>(
      {} as Interfaces.InSearchCompanyInfoResponseInterface
    );

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
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
  console.log(companyItem);
  const tabProps = {
    소개: <CompanyIntroduce item={companyItem} />,
    후원: <CompanySituation item={companyItem} />,
  };

  const data = {
    name: companyItem.name,
    profile: companyItem.profile,
  };
  return (
    <>
      <DetailPageTop data={data} />
      <CustomizedTabs tabProps={tabProps} />
    </>
  );
};

export default CompanyDetailPage;
