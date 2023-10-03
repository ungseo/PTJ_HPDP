import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Interfaces from "../interface/apiDataInterface";
import ImageList from "@mui/material/ImageList";
import CompanyItem from "./CompanyItem";
import { getCompaniesInfo } from "../api/companies";
import styled from "@emotion/styled";
import style from "../styles/css/CompanyList.module.css";
import LoadingSpinner from "./common/LoadingSpinner";

export default function CompanyList({ keyword }: any) {
  const [companyData, setCompanyData] = useState<
    Interfaces.InSearchCompanyInfoResponseInterface[]
  >([]);

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const hashKeyword = keyword;
    console.log(hashKeyword);
    getCompaniesInfo(
      hashKeyword,
      accessToken,
      (res) => {
        setCompanyData(res.data.data);
        setIsLoading(false);
      },
      (err) => {
        console.error("API 호출 실패:", err);
        setIsLoading(false);
      }
    );
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : companyData.length ? (
    <ImageList
      style={{ padding: "1.5rem", gap: "10px", margin: "0" }}
      className={style.wrapper}
    >
      {companyData.map((item, index) => (
        <div
          className={style.box}
          key={index}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CompanyItem item={item} />
        </div>
      ))}
    </ImageList>
  ) : (
    <div>소셜벤처가 없습니다.</div>
  );
}
