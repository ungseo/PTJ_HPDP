import React from 'react';
import style from '../../src/styles/scss/CompanySituation.module.scss'
import Grid from '@mui/material/Grid';
import FundingItem from './FundingItem';

const CompanySituation = () => {
    return (
        <div>
            <div className={style.text}>모금 현황</div>
            <Grid container className={style.total}>
                <Grid item xs={1.5}>
                </Grid>
                <Grid item xs={9} className={style.container}>
                    <div className={style.item}>
                        <div>프로젝트 개수</div>
                        <div>gksk</div>
                    </div>
                    <div className={style.item}>
                        <div>후원 인원</div>
                        <div>gksk</div>
                    </div>
                    <div className={style.item}>
                        <div>모금 개수</div>
                        <div>gksk</div>
                    </div>
                <Grid item xs={1.5} className={style.height}>
                </Grid>
                </Grid>
            </Grid>
            <div className={style.text}>진행 내역</div>
            {[1, 1].map((item) => (
                <FundingItem key={item} />
            ))}
            <div className={style.text}>종료 내역</div>
            {[1, 1].map((item) => (
                <FundingItem key={item} />
            ))}
        </div>
    );
};

export default CompanySituation;