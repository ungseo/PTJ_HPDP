import { useEffect, useState } from "react";
import { OptionTopbar } from "../../components/common/TopBar";
import { useSelector } from "react-redux";
import { getCompanyFundings } from "../../api/companies";
import FundingItem from "../../components/FundingItem";
import FundingListItem from "../../components/companyOnly/FundingListItem";

const CompanyFundingPage = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [fundings, setFundings] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (accessToken) {
      getCompanyFundings(
        accessToken,
        (res) => {
          setFundings(res.data.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [refresh]);
  return (
    <div>
      <OptionTopbar text="내 펀딩 정보" />
      {fundings.length ? (
        <div>
          {fundings.map((funding, idx) => (
            <FundingListItem key={idx} funding={funding} refresh={setRefresh} />
          ))}
        </div>
      ) : (
        <h1>등록한 펀딩 이력이 없습니다.</h1>
      )}
    </div>
  );
};

export default CompanyFundingPage;
