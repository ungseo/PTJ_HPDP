import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Interfaces from "../interface/apiDataInterface";
import { getFundingDetail } from "../api/fundings";
import { getSponsor } from "../api/points";
import { Icon } from "@iconify/react";
import CustomizedTabs from "../components/CustomizedTabs";
import FundingIntroduce from "../components/fundingdetail/FundingIntroduce";
import FundingSituation from "../components/fundingdetail/FundingSituation";
import BottomSheet from "../components/fundingdetail/BottomSheet";
import FundingComplete from "../components/fundingdetail/FundingComplete";
import DetailPageTop from "../components/DetailPageTop";
import DefaultButton from "../components/common/DefaultButton";
import style from "../styles/css/FundingDetailPage.module.css";
import { QuestionModal, NotOkModal } from "../components/common/AlertModals";
import RewardModal from "../components/fundingdetail/RewardModal";

const FundingDetailPage = () => {
  // 상세 조회
  const { fundingid } = useParams();

  const [fundingDetailData, setFundingDetailData] =
    useState<Interfaces.OutFundingsInfoInterface>(
      {} as Interfaces.OutFundingsInfoInterface
    );
  console.log(fundingDetailData.state);

  useEffect(() => {
    getFundingDetail(
      Number(fundingid),
      accessToken,
      (res) => {
        setFundingDetailData(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const tabProps = {
    소개: <FundingIntroduce props={fundingDetailData} />,
    소식: <FundingSituation props={fundingDetailData} />,
  };

  // 기타
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const isLogined = useSelector((state: any) => state.user.auth.isLogined);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFundingCompleteOpen, setIsFundingCompleteOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const myPoint = useSelector((state: any) => state.user.info.point);

  useEffect(() => {
    if (isFundingCompleteOpen) {
      document.body.classList.add(style.bodyWithModalOpen);
    } else {
      document.body.classList.remove(style.bodyWithModalOpen);
    }
  }, [isFundingCompleteOpen]);

  const navigate = useNavigate();
  // bottomsheet가 열린 상태에서 버튼이 눌리면
  // bottomsheet는 false, complete는 true로 변경

  const FundingHandler = () => {
    if (!isLogined) {
      NotOkModal({ text: "로그인이 필요한 서비스입니다." });
    } else {
      if (isBottomSheetOpen) {
        if (donationAmount === 0) {
          QuestionModal({ title: "다시", text: "금액을 입력하세요." });
        } else if (myPoint < donationAmount) {
          QuestionModal({ title: "다시", text: "잔액이 부족합니다." });
        } else if (donationAmount < 100) {
          QuestionModal({
            title: "다시",
            text: "100P이상부터 후원이 가능합니다",
          });
        } else {
          getSponsor(
            accessToken,
            Number(fundingid),
            donationAmount,
            (res) => {
              window.location.reload();
            },
            (err) => {
              console.log(err);
            }
          );
          setIsBottomSheetOpen(false);
          setIsFundingCompleteOpen(true);
          // 2초후에 자동으로 complete 닫기
          setTimeout(() => {
            setIsFundingCompleteOpen(false);
          }, 3000);
        }
      } else {
        setIsBottomSheetOpen(true);
      }
    }
  };

  // 보상 모달
  const handleRewardModalToggle = () => {
    setIsRewardModalOpen(!isRewardModalOpen);
  };

  // 상속 정보
  const data = {
    companyId: fundingDetailData.companyId,
    name: fundingDetailData.name,
    profileImg: fundingDetailData.profileImg,
    thumbnail: fundingDetailData.thumbnail,
    title: fundingDetailData.title,
  };

  return (
    <div className={style.fundingdetailpage}>
      {isLogined && (
        <div className={style.reward_icon} onClick={handleRewardModalToggle}>
          <Icon
            icon="bi:gift"
            style={{ width: "1.5rem", height: "1.5rem", color: "white" }}
          />
        </div>
      )}

      <DetailPageTop data={data} />
      <CustomizedTabs tabProps={tabProps} />
      {isBottomSheetOpen && (
        <>
          <div className={style.bottomsheetbackground}></div>
          <BottomSheet
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            handleDonationAmount={setDonationAmount}
            title={fundingDetailData.title}
            rewardPrice={fundingDetailData.rewardPrice || 0}
          />
        </>
      )}
      {isFundingCompleteOpen && (
        <>
          <div className={style.modalbackground}></div>
          <FundingComplete
            donationAmount={donationAmount}
            title={fundingDetailData.title}
            thumbnail={fundingDetailData.thumbnail}
          />
        </>
      )}
      {isRewardModalOpen && (
        <RewardModal
          rewardPrice={fundingDetailData.rewardPrice || 0}
          myTotalFunding={fundingDetailData.myTotalFunding}
        />
      )}
      <div className={style.fixedButton}>
        {fundingDetailData.state === "ING" ? (
          <DefaultButton
            text="후원하기"
            styles={{ width: "90%", height: "2.5rem" }}
            type="submit"
            onClick={FundingHandler}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FundingDetailPage;
