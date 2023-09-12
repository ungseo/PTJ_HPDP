import React, { useState } from "react";

import CustomizedTabs from '../components/CustomizedTabs';

import FundingIntroduce from '../components/fundingdetail/FundingIntroduce';
import FundingSituation from '../components/fundingdetail/FundingSituation';
import BottomSheet from "../components/fundingdetail/BottomSheet";
import FundingComplete from "../components/fundingdetail/FundingComplete";
import FundingDetailTop from "../components/fundingdetail/FundingDetailTop";

import DefaultButtons from "../components/common/Buttons";

const FundingDetailPage = () => {

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState(0);
    const [isFundingCompleteOpen, setIsFundingCompleteOpen] = useState(false);

    const tabProps = {
        '소개': <FundingIntroduce />,
        '소식': <FundingSituation />
      }

    const FundingHandler = () => {
      if(isBottomSheetOpen){
        setIsBottomSheetOpen(false);
        setIsFundingCompleteOpen(true);

        setTimeout(() => {
          setIsFundingCompleteOpen(false);
          }, 2000);
        }
      else{
        setIsBottomSheetOpen(true);
        }
    };

    
    return (
        <>
        <FundingDetailTop />
        <CustomizedTabs tabProps={tabProps} /> 
        {isBottomSheetOpen && 
            <BottomSheet 
              setIsBottomSheetOpen={setIsBottomSheetOpen} 
              handleDonationAmount={setDonationAmount}
            />
          }
        {isFundingCompleteOpen && <FundingComplete donationAmount={donationAmount} />}
        <DefaultButtons
          text="후원하기"
          onClick={FundingHandler}
          styles={{ width: "80%", height: "70%" }}
        />
        </>
    );
};

export default FundingDetailPage;