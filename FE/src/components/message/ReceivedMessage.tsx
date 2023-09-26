import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageSliceActions } from "../../store/message-slice";
import * as Interfaces from "../../interface/apiDataInterface";
import { getMessage } from "../../api/messages";
import MessagePart from "./MessagePart";
import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import style from "../../styles/css/ReceivedMessage.module.css";

const ReceivedMessage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [messageData, setMessageData] = useState<
    Interfaces.MessagesInterface[]
  >([]);
  const isCheckedAll = useSelector(
    (state: { message: { isCheckedAll: boolean } }) =>
      state.message.isCheckedAll
  );
  const isCheckedList = useSelector(
    (state: { message: { isCheckedAll: boolean; isCheckedList: boolean[] } }) =>
      state.message.isCheckedList
  );
  const handleCheckboxChangeAll = () => {
    dispatch(messageSliceActions.handleCheckboxChangeAll());
  };

  const handleCheckboxChangeSingle = (index: number) => {
    dispatch(messageSliceActions.handleCheckboxChangeSingle(index));
  };
  useEffect(() => {
    dispatch(messageSliceActions.initializeIsCheckedList(messageData.length));
  }, [dispatch, messageData.length]);
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
      <Grid container className={style.upcontent}>
        <Grid item xs={1}>
          <input
            type="checkbox"
            checked={isCheckedAll}
            onChange={() => handleCheckboxChangeAll()}
          />
        </Grid>
        <Grid item xs={11} className={style.icon}>
          <Icon
            icon="bi:trash3"
            style={{ width: "1.3rem", height: "1.3rem", marginRight: "0.7rem" }}
          ></Icon>
        </Grid>
      </Grid>
      <div className={style.down_content}>
        {messageData.map((message, index) => (
          <div key={message.messageId}>
            <MessagePart
              key={message.messageId}
              isChecked={isCheckedList[index]}
              onCheckboxChange={() => handleCheckboxChangeSingle(index)}
              message={message}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedMessage;
