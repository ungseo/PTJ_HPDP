import React from 'react';
import * as Interfaces from "../interface/apiDataInterface";
import DetailHashTag from './fundingdetail/DetailHashTag';

interface CompanyIntroduceProps {
    item: Interfaces.InSearchCompanyInfoResponseInterface;
}

const CompanyIntroduce = (props :CompanyIntroduceProps) => {
    const { item } = props

    const hashtagList = item.hashtag?.split(", ") || [];
    
    return (
        <div>
            <h1>벤처 소개</h1>
            <div>{item.introduce}</div>
            <DetailHashTag hashtagList={hashtagList} />

            <h1>벤처 정보</h1>
            <div>정보</div>
        </div>
    );
};

export default CompanyIntroduce;