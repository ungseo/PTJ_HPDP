import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Interfaces from "../interface/apiDataInterface";
import { getFundingDetail } from "../api/funding";
import { getSponsor } from "../api/points";

import CustomizedTabs from "../components/CustomizedTabs";
import FundingIntroduce from "../components/fundingdetail/FundingIntroduce";
import FundingSituation from "../components/fundingdetail/FundingSituation";
import BottomSheet from "../components/fundingdetail/BottomSheet";
import FundingComplete from "../components/fundingdetail/FundingComplete";
import DetailPageTop from "../components/DetailPageTop";
import DefaultButton from "../components/common/DefaultButton";
import style from "../styles/css/FundingDetailPage.module.css";

const FundingDetailPage = () => {
  // 디테일이라서 값이 1개라 []는 배열이라 안되고 null은 타입지정이 불가해서 안되서 {}객체로 설정
  const [fundingDetailData, setFundingDetailData] =
    useState<Interfaces.OutFundingsInfoInterface>(
      {} as Interfaces.OutFundingsInfoInterface
    );
  console.log(fundingDetailData);

  const { fundingid } = useParams();
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFundingCompleteOpen, setIsFundingCompleteOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);

  const tabProps = {
    소개: <FundingIntroduce props={fundingDetailData} />,
    소식: <FundingSituation props={fundingDetailData} />,
  };

  useEffect(() => {
    getFundingDetail(
      Number(fundingid),
      (res) => {
        setFundingDetailData(res.data.data);
        console.log(fundingDetailData);
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

  // bottomsheet가 열린 상태에서 버튼이 눌리면
  // bottomsheet는 false, complete는 true로 변경
  const FundingHandler = () => {
    if (isBottomSheetOpen) {
      getSponsor(
        accessToken,
        Number(fundingid),
        donationAmount,
        (res) => {
          console.log("후원하기 API 연결");
        },
        (err) => {
          console.log("후원하기 API 호출 실패", err);
        }
      );
      setIsBottomSheetOpen(false);
      setIsFundingCompleteOpen(true);
      // 2초후에 자동으로 complete닫기
      setTimeout(() => {
        setIsFundingCompleteOpen(false);
      }, 2000);
    } else {
      setIsBottomSheetOpen(true);
    }
  };

  const data = {
    name: fundingDetailData.name,
    title: fundingDetailData.title,
    thumbnail: fundingDetailData.thumbnail,
    companyId: fundingDetailData.companyId,
  };

  return (
    <div className={style.fundingdetailpage}>
      <DetailPageTop data={data} />
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
