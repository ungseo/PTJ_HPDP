import React from 'react';
import style from "../styles/css/FundingItem.module.css";

const FundingItem = () => {
    return (
        <div className={style.total}>
            <div className={style.leftimg}></div>
            <div className={style.rightcontent}>교통사고로 턱과 다리를</div>
        </div>
    );
};

export default FundingItem;