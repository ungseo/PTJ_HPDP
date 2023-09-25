import React from "react";
import { Icon } from "@iconify/react";
import style from "../../styles/css/SendMessageModal.module.css";
import DefaultButton from "../../components/common/DefaultButton";
interface SendMessageModalProps {
  onClose: () => void;
}

const SendMessageModal = ({ onClose }: SendMessageModalProps) => {
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
          <input type="text" name="" id="" />
        </div>
        <div className={style.sending}>
          <div style={{ marginRight: "0.5rem" }}>제목</div>
          <input type="text" name="" id="" />
        </div>
        <div className={style.textareaContainer}>
          <textarea
            className={style.textarea}
            placeholder="내용 입력..."
          ></textarea>
        </div>
        <DefaultButton
          text="쪽지 보내기"
          styles={{ width: "50%", height: "2rem" }}
          type="submit"
        />
      </div>
    </div>
  );
};

export default SendMessageModal;
