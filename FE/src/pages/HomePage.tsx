import React from "react";

import { LogoTopbar } from "../components/common/TopBar";
import HomeBanner from "../components/home/HomeBanner";
import FundingCardList from "../components/home/FundingCardList";
import SiteInfo from "../components/home/SiteInfo";

const HomePage = () => {
  return (
    <div>
      <LogoTopbar />
      <HomeBanner />
      <SiteInfo />
      <div>
        <h3>펀딩추천1</h3>
        <FundingCardList />
      </div>
      <div>
        <h3>펀딩추천2</h3>
        <FundingCardList />
      </div>
    </div>
  );
};

export default HomePage;
