import { Icon } from "@iconify/react";

import style from "../../styles/scss/ProfileList.module.scss";

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
    navigate(`/profile/${id}`);
  };

  return (
    <div className={style.container}>
      <div className={style.item} id={`c/info/`} onClick={onClick}>
        <p>기업정보</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} id={`c/fundings`} onClick={onClick}>
        <p>모금내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} id={`message`} onClick={onClick}>
        <p>쪽지내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div
        className={style.item}
        id="logout"
        style={{ color: "red" }}
        onClick={onClick}
      >
        <p>로그아웃</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
    </div>
  );
};

export default ProfileList;
