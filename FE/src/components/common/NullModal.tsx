import React from "react";
import style from "../../styles/css/NullModal.module.css";

const NullModal = ({ text }: { text: string }) => {
  return (
    <div className={style.modal}>
      <div>{text}</div>
    </div>
  );
};

export default NullModal;
