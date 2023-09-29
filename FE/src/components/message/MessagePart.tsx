import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Interfaces from "../../interface/apiDataInterface";
import { getMessageDetail } from "../../api/messages";
import MessageContent from "./MessageContent";
import { Grid } from "@mui/material";
import style from "../../styles/css/MessagePart.module.css";

interface MessagePartProps {
  message: Interfaces.MessagesInterface;
  flag: number;
}

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

const MessagePart = ({ message, flag }: MessagePartProps) => {
  const createDay = formatDate(message.createdDate);
  const [isMessageContent, setMessageContent] = useState(false);
  const [isMessageDetail, setMessageDetail] =
    useState<Interfaces.MessagesInterface>({} as Interfaces.MessagesInterface);
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const messageId = message.messageId;
  const handleShowContentClick = () => {
    setMessageContent(true);
    getMessageDetail(
      accessToken,
      messageId,
      (res) => {
        setMessageDetail(res.data.data);
        console.log("쪽지 상세 API 연결");
      },
      (err) => {
        console.log("쪽지 상세 API 호출 실패", err);
      }
    );
  };

  const handleCloseModal = () => {
    setMessageContent(false);
  };
  console.log(isMessageDetail);
  const data = {
    companyId: isMessageDetail.myId,
  };
  return (
    <div>
      <div style={{ paddingTop: "1rem" }}>
        <div onClick={handleShowContentClick}>
          <div className={style.name_date}>
            <div className={style.name}>
              <div className={style.company_name}>{message.opponentName}</div>
            </div>
            <div className={style.date}>{createDay}</div>
          </div>
          <div className={style.letter}>{message.title}</div>
        </div>
      </div>
      {isMessageContent && (
        <div className="modal">
          <div className={style.modalbackground}></div>
          <MessageContent
            onClose={handleCloseModal}
            isMessageDetail={isMessageDetail}
            flag={flag}
          />
        </div>
      )}
    </div>
  );
};

export default MessagePart;
