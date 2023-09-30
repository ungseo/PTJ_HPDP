import React from "react";
import style from "../../styles/css/ParticipateItem.module.css";
import { ParticipantsInfo } from "../../interface/apiDataInterface";

const ParticipateItem = ({ item }: { item: ParticipantsInfo }) => {
  return (
    <div>
      <img
        src={item.profileImg || "/default_img.png"}
        alt="member_img"
        className={style.praticipant_img}
      />
    </div>
  );
};

export default ParticipateItem;
