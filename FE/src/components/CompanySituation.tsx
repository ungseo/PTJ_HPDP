import React from 'react';

import style from '../../src/styles/scss/CompanySituation.module.scss'
import Grid from '@mui/material/Unstable_Grid2';

const CompanySituation = () => {
    return (
        <div>
            <h1>모금 현황</h1>
            <Grid container className={style.container}>
                <Grid xs={6} className={style.item}>
                    <div>프로젝트 개수</div>
                </Grid>
                <Grid xs={6}>
                    <div>2개</div>
                </Grid>
                <Grid xs={6} className={style.item}>
                    <div>참여 인원</div>
                </Grid>
                <Grid xs={6}>
                    <div>4명</div>
                </Grid>
                <Grid xs={6} className={style.item}>
                    <div>모금 금액</div>
                </Grid>
                <Grid xs={6}>
                    <div>6원</div>
                </Grid>
            </Grid>
            <h1>진행 내역</h1>
            <h1>종료 내역</h1>
        </div>
    );
};

export default CompanySituation;