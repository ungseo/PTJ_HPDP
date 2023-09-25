import React, { useEffect, useState } from "react";
import FundingItem from "./FundingItem";
import { OutFundingsInfoInterface } from "../interface/apiDataInterface";

const OngoingFunding = ({ itemList }: any) => {
  return (
    <div>
      {itemList.length ? (
        itemList.map(
          (
            item: OutFundingsInfoInterface,
            idx: React.Key | null | undefined
          ): any => <FundingItem key={idx} item={item}></FundingItem>
        )
      ) : (
        <h1>후원중인 후원이 없습니다 ^^컄ㅋ~!~!</h1>
      )}
    </div>
  );
};

export default OngoingFunding;
