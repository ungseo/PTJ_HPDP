import { Icon } from "@iconify/react";
import style from "../../styles/css/ProfileListItem.module.css";
const ProfileListItem = ({ text, onClick, id }: any) => {
  return (
    <div className={style.item} id={id} onClick={onClick}>
      <p className={style.p}>{text}</p>
      <Icon className={style.p} icon={"bi:chevron-right"} />
    </div>
  );
};

export default ProfileListItem;
