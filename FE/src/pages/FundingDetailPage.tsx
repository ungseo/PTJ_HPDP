import React, { useState, useEffect } from "react";

import CustomizedTabs from "../components/CustomizedTabs";
import FundingIntroduce from "../components/fundingdetail/FundingIntroduce";
import FundingSituation from "../components/fundingdetail/FundingSituation";
import BottomSheet from "../components/fundingdetail/BottomSheet";
import FundingComplete from "../components/fundingdetail/FundingComplete";
import FundingDetailTop from "../components/fundingdetail/FundingDetailTop";

import DefaultButton from "../components/common/Buttons";
import style from "../styles/css/FundingDetailPage.module.css";

const FundingDetailPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [isFundingCompleteOpen, setIsFundingCompleteOpen] = useState(false);

  const tabProps = {
    소개: <FundingIntroduce />,
    소식: <FundingSituation />,
  };

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
      <FundingDetailTop />
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
