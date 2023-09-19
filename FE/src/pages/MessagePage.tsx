import React from "react";
import { OptionTopbar } from "../components/common/TopBar";
import CustomizedTabs from "../components/CustomizedTabs";
import SendingLetter from "../components/message/SendingMessage";
import ReceivedLetter from "../components/message/ReceivedMessage";

const MessagePage = () => {
  const tabProps = {
    받은쪽지: <ReceivedLetter />,
    보낸쪽지: <SendingLetter />,
  };

  return (
    <div>
      <OptionTopbar text={"쪽지"} />
      <CustomizedTabs tabProps={tabProps} />
    </div>
  );
};

export default MessagePage;
