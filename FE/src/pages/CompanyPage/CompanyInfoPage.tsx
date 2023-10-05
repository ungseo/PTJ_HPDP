import { useEffect, useState } from "react";
import { OptionTopbar } from "../../components/common/TopBar";
import { getMyCompanyInfo } from "../../api/companies";
import { useSelector } from "react-redux";

const CompanyInfoPage = () => {
  const companyInfo = useSelector((state: any) => state.company.info);
  const [info, setInfo] = useState(companyInfo);
  return (
    <div>
      <OptionTopbar text="내(기업) 정보" />
      <div style={{ marginTop: "1.5rem" }}>
        <img src={info.profile} alt="기업로고" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          padding: "1.5rem",
        }}
      >
        <p>회사명: {info.name}</p>
        <p>아이디: {info.loginId}</p>
        <p>이메일: {info.email}</p>
        <p>핸드폰 번호: {info.phoneNumber}</p>
        <p>회사 주소: {info.address}</p>
        <p>웹사이트 :{info.websiteUrl}</p>
      </div>
    </div>
  );
};

export default CompanyInfoPage;
