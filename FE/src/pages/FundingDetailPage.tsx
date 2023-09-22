import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Interfaces from "../interface/apiDataInterface";
import { getFundingDetail } from "../api/funding";

import CustomizedTabs from "../components/CustomizedTabs";
import FundingIntroduce from "../components/fundingdetail/FundingIntroduce";
import FundingSituation from "../components/fundingdetail/FundingSituation";
import BottomSheet from "../components/fundingdetail/BottomSheet";
import FundingComplete from "../components/fundingdetail/FundingComplete";
import DetailPageTop from "../components/DetailPageTop";
import DefaultButton from "../components/common/DefaultButton";
import style from "../styles/css/FundingDetailPage.module.css";

const FundingDetailPage = () => {
  const [fundingDetailData, setFundingDetailData] = useState<
    Interfaces.OutFundingsInfoInterface[]
  >([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [isFundingCompleteOpen, setIsFundingCompleteOpen] = useState(false);
  const { fundingid } = useParams();
  const tabProps = {
    소개: <FundingIntroduce />,
    소식: <FundingSituation />,
  };

  useEffect(() => {
    getFundingDetail(
      Number(fundingid),
      (res) => {
        setFundingDetailData(res.data.data);
        console.log("펀딩 상세 API 연결");
      },
      (err) => {
        console.log("펀딩상세 API 호출 실패", err);
      }
    );
  }, []);

  useEffect(() => {
    if (isFundingCompleteOpen) {
      document.body.classList.add(style.bodyWithModalOpen);
    } else {
      document.body.classList.remove(style.bodyWithModalOpen);
    }
  }, [isFundingCompleteOpen]);

  const FundingHandler = () => {
    if (isBottomSheetOpen) {
      setIsBottomSheetOpen(false);
      setIsFundingCompleteOpen(true);

      setTimeout(() => {
        setIsFundingCompleteOpen(false);
      }, 2000);
    } else {
      setIsBottomSheetOpen(true);
    }
  };

  return (
    <div className={style.fundingdetailpage}>
      <DetailPageTop />
      <CustomizedTabs tabProps={tabProps} />
      {isBottomSheetOpen && (
        <>
          <div className={style.bottomsheetbackground}></div>
          <BottomSheet
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            handleDonationAmount={setDonationAmount}
          />
        </>
      )}
      {isFundingCompleteOpen && (
        <>
          <div className={style.modalbackground}></div>
          <FundingComplete donationAmount={donationAmount} />
        </>
      )}

      <div className={style.fixedButton}>
        <DefaultButton
          text="후원하기"
          styles={{ width: "80%", height: "2rem" }}
          type="submit"
          onClick={FundingHandler}
        />
      </div>
    </div>
  );
};

export default FundingDetailPage;
