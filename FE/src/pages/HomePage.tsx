import React, { useState, useEffect } from "react";
import { LogoTopbar } from "../components/common/TopBar";
import HomeBanner from "../components/home/HomeBanner";
import FundingCardList from "../components/home/FundingCardList";
import SiteInfo from "../components/home/SiteInfo";
import style from "../styles/css/HomePage.module.css";
import * as Interfaces from "../interface/apiDataInterface";
import { getRecommendDeadline, getRecommendAchievement } from "../api/fundings";
import LoadingSpinner from "../components/common/LoadingSpinner";

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

  return (
    <div>
      <LogoTopbar />
      <HomeBanner />
      <SiteInfo />
      <div className={style.introduce}>
        <div className={style.name}>@@@님</div>
        <div>새로운 펀딩에 참여해 보세요</div>
      </div>

      <div>
        <div className={style.title}>마감이 얼마 남지 않았어요!</div>
        <FundingCardList items={fundingDeadlineData} />
      </div>
      <div>
        <div className={style.title}>인기가 많아요!</div>
        <FundingCardList items={fundingAchievementData} />
      </div>
      <LoadingSpinner />
    </div>
  );
};

export default HomePage;
