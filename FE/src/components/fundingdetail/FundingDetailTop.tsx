import React from 'react';
import style from '../../styles/css/FundingDetailTop.module.css'
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";


const FundingDetailTop = () => {

    const navigate = useNavigate();

    const handleGoList = () => {
        navigate("/list");
      };

    return (
        <div className={style.total}>
            <Icon icon="bi:chevron-left" className={style.icon} width="2rem" onClick={handleGoList}/>
            <div className={style.topcontent}>
                <div className={style.upsection}>
                    <img src="/hpdpLogo.png" alt="Company Logo" className={style.upimg}/>
                    <div className={style.companyname}>NoPlasticSaturday</div>
                </div>
                <div className={style.downsection}>
                    <div className={style.fundingtitle}>깨끗한 제주 바다를 위한 활동</div> 
                </div>
            </div>
        </div>
    );
};

export default FundingDetailTop;