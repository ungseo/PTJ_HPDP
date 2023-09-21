import React from "react";
import FundingItem from "./FundingItem";

const FundingList = () => {
  const fundingItems = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <div>
        총 1345개의 펀딩이 진행중 입니다
      </div>

      {fundingItems.map((item) => (
        <FundingItem key={item} />
      ))}
    </div>
  );
};

export default FundingList;
