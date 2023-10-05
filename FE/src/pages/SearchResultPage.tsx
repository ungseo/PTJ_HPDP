import CustomizedTabs from "../components/CustomizedTabs";
import { OptionTopbar } from "../components/common/TopBar";
import { useParams } from "react-router";
import FundingList from "../components/FundingList";
import CompanyList from "../components/CompanyList";
const SearchResultPage = () => {
  const { keyword } = useParams();
  const tabProps = {
    후원: <FundingList keyword={keyword} />,
    기업: <CompanyList keyword={keyword} />,
  };
  return (
    <div id="searchResultPage">
      <OptionTopbar text={`검색결과: ${keyword}`} />
      <CustomizedTabs tabProps={tabProps} />
    </div>
  );
};

export default SearchResultPage;
