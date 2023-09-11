import React from 'react';
import style from "../styles/css/CompanyItem.module.css";

const CompanyItem = () => {
    return (
        <div className={style.companycard}>
            <div className={style.cardimg}></div>
            <div className={style.cardcontent}>
                청화식품........................
            </div>
        </div>
    );
};

export default CompanyItem;