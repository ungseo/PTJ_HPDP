import React from "react";
import { Icon } from "@iconify/react";
import style from "../../styles/css/MessageContent.module.css";
import * as Interfaces from "../../interface/apiDataInterface";

interface MessageProps {
  onClose: () => void;
  isMessageDetail: Interfaces.MessagesInterface;
}

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const MessageContent = ({ onClose, isMessageDetail }: MessageProps) => {
  const formattedDate = formatDate(isMessageDetail.createdDate);
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
          <div>{isMessageDetail.opponentName}</div>
        </div>
        <hr />
        <div className={style.sending}>
          <div style={{ marginRight: "0.5rem" }}>받은사람</div>
          <div>{isMessageDetail.opponentName}</div>
        </div>
        <hr />
        <div className={style.received}>
          <div style={{ marginRight: "0.5rem" }}>보낸시간</div>
          <div>{formattedDate}</div>
        </div>
        <hr />
        <div style={{ marginTop: "1rem", textAlign: "justify" }}>
          {isMessageDetail.content}
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
