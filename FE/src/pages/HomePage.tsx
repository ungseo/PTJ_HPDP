import React from "react";

import { LogoTopbar } from "../components/common/TopBar";
import HomeBanner from "../components/home/HomeBanner";
import FundingCardList from "../components/home/FundingCardList";

const HomePage = () => {
  return (
    <div>
      <LogoTopbar />
      <HomeBanner />
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
