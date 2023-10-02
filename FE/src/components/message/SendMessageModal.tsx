import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getSendingMessage } from "../../api/messages";
import DefaultButton from "../../components/common/DefaultButton";
import { Icon } from "@iconify/react";
import style from "../../styles/css/SendMessageModal.module.css";

interface SendMessageModalProps {
  onClose: () => void;
  data: {
    name: string;
    receiverId: number;
  };
}

const SendMessageModal = ({ onClose, data }: SendMessageModalProps) => {
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  console.log(data);
  const handleSendingMessage = () => {
    getSendingMessage(
      accessToken,
      data.receiverId,
      messageTitle,
      messageContent,
      (res) => {
        console.log("쪽지보내기 API연결");
        alert("전송이 완료되었습니다.");
        onClose();
      },
      (err) => {
        console.error("쪽지보내기 API 호출 실패:", err);
      }
    );
  };

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
          <div style={{ marginRight: "0.5rem" }}>받는사람</div>
          <div style={{ fontWeight: "bold" }}>{data.name}</div>
        </div>
        <div className={style.sending}>
          <div style={{ marginRight: "0.5rem" }}>제목</div>
          <input
            type="text"
            name="messageTitle"
            id="messageTitle"
            value={messageTitle}
            onChange={(e) => setMessageTitle(e.target.value)}
          />
        </div>
        <div className={style.textareaContainer}>
          <textarea
            className={style.textarea}
            placeholder="내용 입력..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          ></textarea>
        </div>
        <DefaultButton
          text="쪽지 보내기"
          styles={{ width: "50%", height: "2.5rem" }}
          type="submit"
          onClick={handleSendingMessage}
        />
      </div>
    </div>
  );
};

export default SendMessageModal;
