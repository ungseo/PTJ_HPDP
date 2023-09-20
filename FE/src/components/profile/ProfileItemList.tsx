import { useSelector } from "react-redux";
import style from "../../styles/css/ProfileItemList.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { logout } from "../../api/auth";

const ProfileItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.user.info.memberId);
  console.log(userId);
  //router 설정, id = 각 버튼의 id, 버튼 id값에 주소 입력후 navigate에 동적으로 할당
  const onClick = (event: any) => {
    const { id } = event.target;
    const accessToken = localStorage.getItem("Atoken");
    if (id === "logout") {
      logout(
        accessToken,
        (res) => {
          dispatch(userActions.logoutHandler());
          alert("로그아웃 되었습니다.");
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
    <div className={style.profileItemList}>
      <div className={style.item} onClick={onClick} id={`message/${userId}`}>
        <p>쪽지</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div
        className={style.item}
        id={`history/transaction/${userId}`}
        onClick={onClick}
      >
        <p>거래내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div
        className={style.item}
        id={`history/funding/${userId}`}
        onClick={onClick}
      >
        <p>후원내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div
        className={style.item}
        id={`company/interest/${userId}`}
        onClick={onClick}
      >
        <p>관심기업</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} id="testbank" onClick={onClick}>
        <p>서비스 테스트 페이지</p>
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

export default ProfileItemList;
