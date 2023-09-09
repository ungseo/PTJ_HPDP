import React from 'react';
import HomeBanner from '../components/HomeBanner';
import FundingCardList from '../components/FundingCardList';

const HomePage = () => {
    return (
        <div>
            <p>한푼두푼</p>
            <HomeBanner/>
            <div>
                <h3>펀딩추천1</h3>
                <FundingCardList/>
            </div>
            <div>
                <h3>펀딩추천2</h3>
                <FundingCardList/>
            </div>            
        </div>
    );
};

export default HomePage;