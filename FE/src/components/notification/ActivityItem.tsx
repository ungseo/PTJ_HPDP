import React from "react";
import Grid from "@mui/material/Grid";
import style from "../../styles/css/ActivityItem.module.css";
import { useNavigate } from "react-router-dom";

const ActivityItem = () => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={3} className={style.imgfield}>
        <div className={style.img}>xs=3</div>
      </Grid>
      <Grid item xs={9} className={style.contentfield}>
        <div className={style.contentbox}>
          <div className={style.content}>2023.09.01</div>
          <div className={style.content}>깨끗한 바다와~</div>
          <div className={style.content}>
            김웅서님의 1,000포인트가~ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ActivityItem;
