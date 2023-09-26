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
      <div>
        <img src={info.profile} alt="기업로고" />
      </div>
      <p>{info.name}</p>
      <p>{info.loginId}</p>
      <p>{info.email}</p>
      <p>{info.phoneNumber}</p>
      <p>{info.address}</p>
      <p>{info.websiteUrl}</p>
    </div>
  );
};

export default CompanyInfoPage;
