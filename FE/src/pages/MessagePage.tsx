import React, { useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import CustomizedTabs from "../components/CustomizedTabs";
import SendingLetter from "../components/message/SendingMessage";
import ReceivedLetter from "../components/message/ReceivedMessage";
import { Icon } from "@iconify/react";
import style from "../styles/css/MessagePage.module.css";
import SendMessageModal from "../components/message/SendMessageModal";

const MessagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tabProps = {
    받은쪽지: <ReceivedLetter />,
    보낸쪽지: <SendingLetter />,
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.messagepage}>
      <OptionTopbar text={"쪽지"} />
      <CustomizedTabs tabProps={tabProps} />
      <div className={style.message_icon}>
        <Icon
          icon="bi:chat-square-dots"
          style={{
            width: "1.7rem",
            height: "1.5rem",
          }}
          className={style.Icon_icon}
          onClick={openModal}
        ></Icon>
      </div>
      {isModalOpen && (
        <>
          <div className={style.modalbackground}></div>
          <SendMessageModal onClose={closeModal} />
        </>
      )}
    </div>
  );
};

export default MessagePage;
