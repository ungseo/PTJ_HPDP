import React from "react";
import { Icon } from "@iconify/react";
import style from "../../styles/css/MessageContent.module.css";

interface MessageProps {
  onClose: () => void;
}

const MessageContent = ({ onClose }: MessageProps) => {
  return (
    <div className={style.messageModal}>
      <div className={style.messagecontent}>
        <div className={style.icon_section}>
          <Icon
            icon="bi:x-square"
            onClick={onClose}
            style={{
              width: "1.3rem",
              height: "1.3rem",
            }}
            className={style.icon}
          ></Icon>
        </div>

        <div className={style.sending}>
          <div style={{ marginRight: "0.5rem" }}>보낸사람</div>
          <div>noplasticsunday</div>
        </div>
        <hr />
        <div className={style.sending}>
          <div style={{ marginRight: "0.5rem" }}>받은사람</div>
          <div>김웅서</div>
        </div>
        <hr />
        <div className={style.received}>
          <div style={{ marginRight: "0.5rem" }}>보낸시간</div>
          <div>2023-09-20 17:39</div>
        </div>
        <hr />
        <div style={{ marginTop: "1rem", textAlign: "justify" }}>
          안녕하세요. 김웅서님. NoPlasticSunday입니다. 저희 NoPlasticSunday는
          깨끗한 바다와 플라스틱 쓰레기 없는 제주를 꿈꿉니다. 저희는 제주 하르방
          키링 판매 수익의 1%를 세이브제주바다의 바다 정화 활동에 기부해요. 제주
          하르방 키링은 세이브제주바다의 바다정화 활동으로 모은 부표, 폐 어망
          등의 바다 플라스틱 쓰레기를 재활용했어요. 수거한 바다 플라스틱
          쓰레기는 분쇄하여 재활용 할 수 있는 펠렛으로 소재화해요.
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
