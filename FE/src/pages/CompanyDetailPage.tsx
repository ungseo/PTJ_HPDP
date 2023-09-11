import React from 'react';

import CustomizedTabs from '../components/CustomizedTabs';

import CompanyIntroduce from '../components/CompanyIntroduce';
import CompanySituation from '../components/CompanySituation';


const CompanyDetailPage = () => {

    const tabProps = {
        '소개': <CompanyIntroduce />,
        '소식': <CompanySituation />
      }
    return (
        <>
            <div style={{height:"15rem", backgroundColor:"yellow"}}>
            회사프로필 이미지, 회사이름 (배경은 이미지)
            </div>
            <CustomizedTabs tabProps={tabProps} /> 
        </>
    );
};

export default CompanyDetailPage;