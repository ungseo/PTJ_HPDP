import { useEffect } from "react";
import { OptionTopbar } from "../../components/common/TopBar";
import { useSelector } from "react-redux";
import { getCompanyFundings } from "../../api/companies";

const CompanyFundingPage = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  useEffect(() => {
    if (accessToken) {
      getCompanyFundings(
        accessToken,
        (res) => {},
        (err) => {}
      );
    }
  }, []);
  return (
    <div>
      <OptionTopbar text="내 펀딩 정보" />
      <div>{}</div>
    </div>
  );
};

export default CompanyFundingPage;
