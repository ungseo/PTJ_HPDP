import React from 'react';
import CompanyItem from './CompanyItem';
import style from '../styles/css/CompanyList.module.css';

const CompanyList = () => {
  return (
    <>
    <div>321개의 기업이 함께하고 있습니다</div>
      <div className={style.companyListContainer}>
        <div className={style.companyItem}><CompanyItem/></div>
        <div className={style.companyItem}><CompanyItem/></div>
        <div className={style.companyItem}><CompanyItem/></div>
        <div className={style.companyItem}><CompanyItem/></div>
      </div>
    </>
  )
}

export default CompanyList;
