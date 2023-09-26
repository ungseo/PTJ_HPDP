import { Icon } from "@iconify/react";
import style from "../../styles/css/ProfileList.module.css";
import ProfileListItem from "./ProfileListItem";
import { useNavigate } from "react-router";
import { logout } from "../../api/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

const ProfileList = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = (event: any) => {
    const { id } = event.target;
    if (id === "logout") {
      //로그아웃함수
      logout(
        accessToken,
        (res) => {
          dispatch(userActions.logoutHandler());
          alert("로그아웃 되었습니다.");
          navigate("/");
        },
        (err) => {
          alert(err.message);
        }
      );
      return;
    }
    navigate(`/profile${id}`);
  };
  return (
    <div className={style.wrapper}>
      <ProfileListItem
        text="내(기업) 정보보기"
        id={"/c/info"}
        onClick={onClick}
      />
      <ProfileListItem
        text="내 펀딩 보기"
        id={"/c/fundings"}
        onClick={onClick}
      />
      <ProfileListItem text="쪽지함" id={"/message"} onClick={onClick} />
      <ProfileListItem text="로그아웃" id={"logout"} onClick={onClick} />
    </div>
  );
};

export default ProfileList;
