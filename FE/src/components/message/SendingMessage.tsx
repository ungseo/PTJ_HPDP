import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import style from "../../styles/css/SendingMessage.module.css";
import MessagePart from "./MessagePart";
import MessageContent from "./MessageContent";

import { useSelector, useDispatch } from "react-redux";
import { messageSliceActions } from "../../store/message-slice";

const SendingMessage = () => {
  const dispatch = useDispatch();
  const isCheckedAll = useSelector(
    (state: { message: { isCheckedAll: boolean } }) =>
      state.message.isCheckedAll
  );
  const isCheckedList = useSelector(
    (state: { message: { isCheckedAll: boolean; isCheckedList: boolean[] } }) =>
      state.message.isCheckedList
  );
  const [isMessageContent, setMessageContent] = useState(false);

  const messages = [
    { id: 1, content: "First" },
    { id: 2, content: "Second" },
    { id: 3, content: "Third" },
  ];

  const handleCheckboxChangeAll = () => {
    dispatch(messageSliceActions.handleCheckboxChangeAll());
  };

  const handleCheckboxChangeSingle = (index: number) => {
    dispatch(messageSliceActions.handleCheckboxChangeSingle(index));
  };
  useEffect(() => {
    dispatch(messageSliceActions.initializeIsCheckedList(messages.length));
  }, [dispatch, messages.length]);

  const handleShowContentClick = () => {
    setMessageContent(true);
  };
  const handleCloseModal = () => {
    setMessageContent(false);
  };

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
        {messages.map((message, index) => (
          <div onClick={handleShowContentClick}>
            <MessagePart
              key={message.id}
              isChecked={isCheckedList[index]}
              onCheckboxChange={() => handleCheckboxChangeSingle(index)}
            />
          </div>
        ))}
      </div>
      {isMessageContent && (
        <div className="modal">
          <div className={style.modalbackground}></div>
          <MessageContent onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default SendingMessage;
