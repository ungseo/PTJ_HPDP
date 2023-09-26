import React, { useState, useEffect } from "react";
import { LogoTopbar } from "../components/common/TopBar";
import HomeBanner from "../components/home/HomeBanner";
import FundingCardList from "../components/home/FundingCardList";
import SiteInfo from "../components/home/SiteInfo";

import * as Interfaces from "../interface/apiDataInterface";
import { getRecommendDeadline, getRecommendAchievement } from "../api/fundings";

const HomePage = () => {
  const [fundingDeadlineData, setFundingDeadlineData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  const [fundingAchievementData, setFundingAchievementData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  useEffect(() => {
    getRecommendDeadline(
      (res) => {
        setFundingDeadlineData(res.data.data);
        console.log("펀딩 DL API 연결");
      },
      (err) => {
        console.log("펀딩 DL API 호출 실패", err);
      }
    );
  }, []);
  useEffect(() => {
    getRecommendAchievement(
      (res) => {
        setFundingAchievementData(res.data.data);
        console.log("펀딩 AC API 연결");
      },
      (err) => {
        console.log("펀딩 AC API 호출 실패", err);
      }
    );
  }, []);
  console.log(fundingDeadlineData);
  return (
    <div>
      <LogoTopbar />
      <HomeBanner />
      <SiteInfo />
      <div>
        <h3>곧 종료될 펀딩</h3>
        <FundingCardList items={fundingDeadlineData} />
      </div>
      <div>
        <h3>가장 인기있는 펀딩</h3>
        <FundingCardList items={fundingAchievementData} />
      </div>
    </div>
  );
};

export default HomePage;
