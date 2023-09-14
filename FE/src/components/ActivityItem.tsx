import React from 'react';
import style from "../styles/css/ActivityItem.module.css";

const ActivityItem = () => {
  return (
    <div className={style.total}>
      <div className={style.backimg}>
        <div className={style.topdiv}>
          <div className={style.topimg}></div>
          <div className={style.topcontent}>
            <div>2023.09.01</div>
            <div>제주도 푸른 밤~</div>
            <div>김웅서님의 1,000포인트가 ~</div>
          </div>
        </div>
        <div className={style.botdiv}>
          <div className={style.botimg}></div>
          <div className={style.botcontent}>z</div>
        </div>
      </div>
    </div>
  )
}

export default ActivityItem