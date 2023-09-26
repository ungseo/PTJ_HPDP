import { Icon } from "@iconify/react";
import style from "../../styles/css/ProfileList.module.css";
import ProfileListItem from "./ProfileListItem";
import { useNavigate } from "react-router";

const ProfileList = () => {
  const navigate = useNavigate();
  const onClick = (event: any) => {
    const { id } = event.target;
    navigate(`/profile/c/${id}`);
  };
  return (
    <div className={style.wrapper}>
      <ProfileListItem text="내(기업) 정보보기" id={"info"} onClick={onClick} />
      <ProfileListItem text="내 펀딩 보기" id={"fundings"} onClick={onClick} />
    </div>
  );
};

export default ProfileList;
