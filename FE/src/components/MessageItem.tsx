import React from 'react';
import Grid from '@mui/material/Grid';
import style from "../styles/css/MessageItem.module.css";
import { useNavigate } from "react-router-dom";

const MessageItem = () => {
  const navigate = useNavigate();
  
  return (
    <Grid container>
      <Grid item xs={3} className={style.imgfield}>
        <div className={style.img}>xs=3</div>
      </Grid>
      <Grid item xs={9} className={style.contentfield}>
        <div className={style.contentbox}>
          <div className={style.content}>2023.09.01</div>
          <div className={style.content}>NoPlasticSunday에서~</div>
          <div className={style.content}>안녕하세요, 김웅서님.~ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</div>
        </div>
      </Grid>
    </Grid>
  )
}

export default MessageItem