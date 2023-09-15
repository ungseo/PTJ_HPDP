import React from 'react'
import FundingItem from './FundingItem';

const OngoingFunding = () => {
  const fundingItems = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      {fundingItems.map((item) => (
        <FundingItem key={item} />
      ))}
    </div>
  )
}

export default OngoingFunding
