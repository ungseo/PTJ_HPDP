import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Interfaces from "../../interface/apiDataInterface";
import { getMessage } from "../../api/messages";
import MessagePart from "./MessagePart";
import style from "../../styles/css/ReceivedMessage.module.css";

const ReceivedMessage = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [messageData, setMessageData] = useState<
    Interfaces.MessagesInterface[]
  >([]);

  useEffect(() => {
    getMessage(
      accessToken,
      0,
      (res) => {
        setMessageData(res.data.data);
        console.log("받은 쪽지 API 연결");
      },
      (err) => {
        console.log("받은 쪽지 API 호출 실패", err);
      }
    );
  }, []);

  return (
    <div className={style.message}>
      <div className={style.down_content}>
        {messageData.map((message, index) => (
          <div key={message.messageId}>
            <MessagePart key={message.messageId} message={message} flag={0} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedMessage;
