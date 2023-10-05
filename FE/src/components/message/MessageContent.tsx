import React, { useState, useEffect } from "react";
import * as Interfaces from "../../interface/apiDataInterface";
import { Icon } from "@iconify/react";
import SendMessageModal from "../../components/message/SendMessageModal";
import style from "../../styles/css/MessageContent.module.css";
import DefaultButton from "../../components/common/DefaultButton";
interface MessageProps {
  onClose: () => void;
  isMessageDetail: Interfaces.MessagesInterface;
  flag: number;
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

const MessageContent = ({ onClose, isMessageDetail, flag }: MessageProps) => {
  const formattedDate = formatDate(isMessageDetail.createdDate);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);

  const handleOpenSendMessageModal = () => {
    setShowSendMessageModal(true);
  };

  const handleSendMessageModalClose = () => {
    setShowSendMessageModal(false);
    onClose();
  };

  console.log(isMessageDetail);
  const opponentName = isMessageDetail.opponentName || "";
  const opponentId =
    typeof isMessageDetail.opponentId === "number"
      ? isMessageDetail.opponentId
      : 0;

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

        {flag === 0 && (
          <div>
            <div className={style.received}>
              <div style={{ marginRight: "0.5rem" }}>보낸사람</div>
              <div>{isMessageDetail.opponentName}</div>
            </div>

            <hr />
            <div className={style.received}>
              <div style={{ marginRight: "0.5rem" }}>받은시간</div>
              <div>{formattedDate}</div>
            </div>

            <hr />
          </div>
        )}

        {flag === 1 && (
          <div>
            <div className={style.sending}>
              <div style={{ marginRight: "0.5rem" }}>받는사람</div>
              <div style={{ fontWeight: "bold" }}>
                {isMessageDetail.opponentName}
              </div>
            </div>
            <hr />
            <div className={style.sending}>
              <div style={{ marginRight: "0.5rem" }}>보낸시간</div>
              <div>{formattedDate}</div>
            </div>
            <hr />
          </div>
        )}

        <div
          style={{
            marginTop: "1rem",
            textAlign: "justify",
            marginBottom: "1rem",
            height: "35vh",
          }}
        >
          {isMessageDetail.content}
        </div>
        {flag === 0 && (
          <div className={style.return_btn}>
            <DefaultButton
              text="답장하기"
              styles={{ width: "40%", height: "2rem" }}
              type="submit"
              onClick={handleOpenSendMessageModal}
            />
          </div>
        )}
      </div>
      {showSendMessageModal && (
        <SendMessageModal
          onClose={handleSendMessageModalClose}
          data={{
            name: opponentName,
            companyId: opponentId,
          }}
        />
      )}
    </div>
  );
};

export default MessageContent;
