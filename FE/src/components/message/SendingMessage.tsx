import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageSliceActions } from "../../store/message-slice";
import * as Interfaces from "../../interface/apiDataInterface";
import { getMessage } from "../../api/messages";
import MessagePart from "./MessagePart";
import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import style from "../../styles/css/SendingMessage.module.css";

const SendingMessage = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [messageData, setMessageData] = useState<
    Interfaces.MessagesInterface[]
  >([]);

  useEffect(() => {
    getMessage(
      accessToken,
      1,
      (res) => {
        setMessageData(res.data.data);
        console.log("보낸 쪽지 API 연결");
      },
      (err) => {
        console.log("보낸 쪽지 API 호출 실패", err);
      }
    );
  }, []);

  return (
    <div className={style.message}>
      <div className={style.down_content}>
        {messageData.map((message, index) => (
          <div key={message.messageId}>
            <MessagePart key={message.messageId} message={message} flag={1} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendingMessage;
