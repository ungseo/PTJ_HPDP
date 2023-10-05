import React from "react";
import FundingCard from "./home/FundingCard";
import FundingItem from "./FundingItem";
import { OutFundingsInfoInterface } from "../interface/apiDataInterface";
import NullModal from "./common/NullModal";

const ExpiredFunding = ({ itemList }: any) => {
  return (
    <div style={{ marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem" }}>
      {itemList.length ? (
        itemList.map(
          (
            item: OutFundingsInfoInterface,
            idx: React.Key | null | undefined
          ) => <FundingItem key={idx} item={item} />
        )
      ) : (
        <NullModal text="후원하는 프로젝트가 없습니다." />
      )}
    </div>
  );
};

export default ExpiredFunding;
