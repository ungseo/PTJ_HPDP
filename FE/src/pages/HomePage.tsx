import React from 'react';
import HomeBanner from '../components/HomeBanner';
import FundingCard from '../components/FundingCard';

const HomePage = () => {
    return (
        <div>
            <p>한푼두푼</p>
            <HomeBanner/>
            <div>
                펀딩추천1
                <FundingCard/>
            </div>
            <div>
                펀딩추천2
                <FundingCard/>
            </div>            
        </div>
    );
};

export default HomePage;