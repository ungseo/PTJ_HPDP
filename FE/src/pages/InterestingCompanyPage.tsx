import React, { useEffect, useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import ImageList from "@mui/material/ImageList";
import CompanyItem from "../components/CompanyItem";
import { getInterestingCompany } from "../api/interests";
import { useSelector } from "react-redux";
import * as Interfaces from "../interface/apiDataInterface";
import NullModal from "../components/common/NullModal";

const InterestingCompanyPage = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [interestingCoList, setInterestingCoList] = useState<
    Interfaces.InSearchCompanyInfoResponseInterface[]
  >([]);

  console.log(interestingCoList);

  useEffect(() => {
    getInterestingCompany(
      accessToken,
      (res) => {
        console.log(res.data.data);
        setInterestingCoList(res.data.data);
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div>
      <OptionTopbar text="관심기업" />
      <div style={{ marginRight: "1rem", marginLeft: "1rem" }}>
        {interestingCoList !== null ? (
          <ImageList>
            {interestingCoList.map((item, index) => (
              <CompanyItem key={index} item={item} />
            ))}
          </ImageList>
        ) : (
          <NullModal text="등록된 관심기업이 없습니다." />
        )}
      </div>
    </div>
  );
};

export default InterestingCompanyPage;
