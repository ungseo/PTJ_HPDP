import React from 'react';

import CustomizedTabs from '../components/CustomizedTabs';

import CompanyIntroduce from '../components/CompanyIntroduce';
import CompanySituation from '../components/CompanySituation';
import DetailPageTop from '../components/DetailPageTop';

const CompanyDetailPage = () => {

    const tabProps = {
        '소개': <CompanyIntroduce />,
        '후원': <CompanySituation />
      }
    return (
        <>
            <DetailPageTop></DetailPageTop>
            <CustomizedTabs tabProps={tabProps} /> 
        </>
    );
};

export default CompanyDetailPage;