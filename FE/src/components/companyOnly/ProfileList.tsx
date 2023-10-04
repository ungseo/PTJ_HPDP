import { Icon } from "@iconify/react";
import style from "../../styles/css/ProfileList.module.css";
import ProfileListItem from "./ProfileListItem";
import { useNavigate } from "react-router";
import { logout } from "../../api/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { OkModal } from "../common/AlertModals";

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
          OkModal({ title: "로그아웃", text: "다음에 만나요!" });
          navigate("/");
        },
        (err) => {}
      );
      dispatch(userActions.logoutHandler());
      navigate("/");
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
      <div style={{ color: "red" }}>
        <ProfileListItem text="로그아웃" id={"logout"} onClick={onClick} />
      </div>
    </div>
  );
};

export default ProfileList;
