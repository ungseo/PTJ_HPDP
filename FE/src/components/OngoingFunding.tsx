import React, { useEffect, useState } from "react";
import FundingItem from "./FundingItem";
import { OutFundingsInfoInterface } from "../interface/apiDataInterface";
import NullModal from "./common/NullModal";

const OngoingFunding = ({ itemList }: any) => {
  return (
    <div>
      {itemList.length ? (
        itemList.map(
          (
            item: OutFundingsInfoInterface,
            idx: React.Key | null | undefined
          ) => <FundingItem key={idx} item={item} />
        )
      ) : (
        <NullModal text="진행중인 펀딩이 없습니다." />
      )}
    </div>
  );
};

export default OngoingFunding;
