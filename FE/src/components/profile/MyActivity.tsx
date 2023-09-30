import { useSelector } from "react-redux";
import style from "../../styles/css/MyActivity.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { logout } from "../../api/auth";

const MyActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  //router 설정, id = 각 버튼의 id, 버튼 id값에 주소 입력후 navigate에 동적으로 할당
  const onClick = (event: any) => {
    const { id } = event.target;

    if (id === "logout") {
      logout(
        accessToken,
        (res) => {
          dispatch(userActions.logoutHandler());
          alert("로그 아웃 되었습니다.");
          navigate("/");
        },
        (err) => {
          alert(err);
        }
      );
      return;
    }
    navigate(`/profile/${id}`);
  };
  return (
    <div className={style.container}>
      <div
        className={style.item}
        onClick={onClick}
        style={{ borderTop: "1px solid lightgray" }}
        id={`message/`}
      >
        <p>쪽지내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} id={`history/transaction/`} onClick={onClick}>
        <p>거래내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} id={`history/funding/`} onClick={onClick}>
        <p>후원내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} id={`company/interest/`} onClick={onClick}>
        <p>관심기업</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} id="testbank" onClick={onClick}>
        <p>시험은행</p>
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

export default MyActivity;
