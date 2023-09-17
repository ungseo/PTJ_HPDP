import { useSelector } from "react-redux";
import style from "../../styles/css/ProfileItemList.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const ProfileItemList = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.user.userId);

  //router 설정, id = 각 버튼의 id, 버튼 id값에 주소 입력후 navigate에 동적으로 할당
  const onClick = (event: any) => {
    const { id } = event.target;
    navigate(`/profile/${id}`);
  };
  return (
    <div className={style.profileItemList}>
      <div className={style.item} onClick={onClick} id="">
        <p>쪽지함</p>
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
      <div className={style.item} id="interest-companies" onClick={onClick}>
        <p>관심기업</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} onClick={onClick}>
        <p>서비스 테스트 페이지</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} style={{ color: "red" }} onClick={onClick}>
        <p>로그아웃</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
    </div>
  );
};

export default ProfileItemList;
