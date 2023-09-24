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
            <div>사업자 등록 번호: {item.registrationNumber}</div>
            <div>번호: {item.phoneNumber}</div>
            <div>메일: {item.email}</div>
            <div>사이트 접속 주소: {item.websiteUrl}</div>
            <div>주소: {item.address}</div>
        </div>
    );
};

export default CompanyIntroduce;