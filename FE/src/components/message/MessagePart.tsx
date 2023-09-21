import React, { useState } from "react";
import { Grid } from "@mui/material";
import style from "../../styles/css/MessagePart.module.css";

interface MessagePartProps {
  isChecked: boolean;
  onCheckboxChange: () => void;
}

const MessagePart = ({ isChecked, onCheckboxChange }: MessagePartProps) => {
  return (
    <Grid container style={{ paddingTop: "1rem" }}>
      <Grid item xs={1}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxChange()}
        />
      </Grid>
      <Grid item xs={11}>
        <div className={style.name_date}>
          <div className={style.name}>
            <img src="/hpdpLogo.png" alt="Company Logo" />
            <div className={style.company_name}>noplasticsunday</div>
          </div>
          <div className={style.date}>2023.09.01</div>
        </div>
        <div className={style.letter}>
          안녕하세요, 김웅서 님. NoPlasticSunday입니다. 제주 하르방 키링은
          세이브제주바다의 바다정화 활동으로 모은 부표, 폐 어망 등의 바다
          플라스틱 쓰레기를 재활용했어요. 수거한 바다 플라스틱 쓰레기는 분쇄하여
          재활용 할 수 있는 펠렛으로 소재화해요.
        </div>
      </Grid>
    </Grid>
  );
};

export default MessagePart;
