import React from "react";
import FundingCard from "./home/FundingCard";
import FundingItem from "./FundingItem";
import { OutFundingsInfoInterface } from "../interface/apiDataInterface";

const ExpiredFunding = ({ itemList }: any) => {
  console.log(itemList, "만료");
  return (
    <div>
      {itemList.length ? (
        itemList.map(
          (
            item: OutFundingsInfoInterface,
            idx: React.Key | null | undefined
          ) => (
            <div key={idx}>
              <h1>{item.name}</h1>
            </div>
          )
        )
      ) : (
        <h1>끝난펀딩도 없어요 ㅋ</h1>
      )}
    </div>
  );
};

export default ExpiredFunding;
