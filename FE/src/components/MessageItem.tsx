import React from 'react';
import style from "../styles/css/MessageItem.module.css";

const MessageItem = () => {
  return (
    <div className={style.total}>
      <div className={style.backimg}>
        <div className={style.topdiv}>
          <div className={style.topimg}></div>
          <div className={style.topcontent}>
            <div>2023.09.01</div>
            <div>NoPlasticSunday에서 쪽지가 ~</div>
            <div>안녕하세요, 김웅서님. ~</div>
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

export default MessageItem