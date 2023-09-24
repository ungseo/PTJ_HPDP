import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Interfaces from "../interface/apiDataInterface";
import ImageList from "@mui/material/ImageList";
import CompanyItem from "./CompanyItem";

import { getCompaniesInfo } from "../api/companies";

export default function CompanyList() {
  const [companyData, setCompanyData] = useState<
    Interfaces.InSearchCompanyInfoResponseInterface[]
  >([]);

  const [keyword, setkeyword] = useState('');

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  useEffect(() => {
    getCompaniesInfo(
      keyword,
      accessToken,
      (res) => {
        setCompanyData(res.data.data);
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <ImageList>
      {companyData.map((item, index) => (
        <CompanyItem key={index} item={item} />
      ))}
    </ImageList>
  );
}
