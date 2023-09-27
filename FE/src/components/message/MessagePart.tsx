import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Interfaces from "../../interface/apiDataInterface";
import { getMessageDetail } from "../../api/messages";
import MessageContent from "./MessageContent";
import { Grid } from "@mui/material";
import style from "../../styles/css/MessagePart.module.css";

interface MessagePartProps {
  isChecked: boolean;
  onCheckboxChange: () => void;
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

const MessagePart = ({
  isChecked = false,
  onCheckboxChange,
  message,
  flag,
}: MessagePartProps) => {
  console.log(message);
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
  console.log(flag);
  const handleCloseModal = () => {
    setMessageContent(false);
  };
  console.log(isMessageDetail);
  return (
    <div>
      <Grid container style={{ paddingTop: "1rem" }}>
        <Grid
          item
          xs={1}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onCheckboxChange()}
          />
        </Grid>
        <Grid item xs={11} onClick={handleShowContentClick}>
          <div className={style.name_date}>
            <div className={style.name}>
              <div className={style.company_name}>{message.opponentName}</div>
            </div>
            <div className={style.date}>{createDay}</div>
          </div>
          <div className={style.letter}>{message.title}</div>
        </Grid>
      </Grid>
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
