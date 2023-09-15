import React from "react";

import { OptionTopbar } from "../components/common/TopBar";
import CustomizedTabs from "../components/CustomizedTabs";
import FundingList from "../components/FundingList";
import CompanyList from "../components/CompanyList";

const ListPage = () => {
  const tabProps = {
    후원: <FundingList />,
    기업: <CompanyList />,
  };

  return (
    <div>
      <OptionTopbar text={"목록"} />
      <CustomizedTabs tabProps={tabProps} />
    </div>
  );
};

export default ListPage;
