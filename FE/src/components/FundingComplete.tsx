import React from 'react';

interface FundingCompleteProps {
    donationAmount: number;
}

const FundingComplete = ({ donationAmount }: FundingCompleteProps) => {
    return (
        <div style={{margin:"2rem"}}>
            후원완료: {donationAmount}
        </div>
    );
};

export default FundingComplete;
