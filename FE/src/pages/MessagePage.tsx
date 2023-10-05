import React, { useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import CustomizedTabs from "../components/CustomizedTabs";
import SendingLetter from "../components/message/SendingMessage";
import ReceivedLetter from "../components/message/ReceivedMessage";
import style from "../styles/css/MessagePage.module.css";

const MessagePage = () => {
  const tabProps = {
    받은쪽지: <ReceivedLetter />,
    보낸쪽지: <SendingLetter />,
  };

  return (
    <div className={style.messagepage}>
      <OptionTopbar text={"쪽지"} />
      <CustomizedTabs tabProps={tabProps} />
    </div>
  );
};

export default MessagePage;
