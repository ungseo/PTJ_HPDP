import React from 'react';
import Grid from '@mui/material/Grid';
import style from "../styles/css/ActivityItem.module.css";
import { useNavigate } from "react-router-dom";

const ActivityItem = () => {
  const navigate = useNavigate();

  return (
    <Grid container className={style.total}>
      <Grid item xs={3} className={style.imgheight}>
        <div className={style.img}>xs=3</div>
      </Grid>
      <Grid item xs={9} className={style.contentheight}>
        <div className={style.content}>1</div>
        <div className={style.content}>2</div>
        <div className={style.content}>3</div>
      </Grid>
    </Grid>
  )
}

export default ActivityItem