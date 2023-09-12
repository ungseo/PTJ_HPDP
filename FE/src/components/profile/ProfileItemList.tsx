import style from "../../styles/css/ProfileItemList.module.css";
import { Icon } from "@iconify/react";
const ProfileItemList = () => {
  const onClick = (event: any) => {
    const { id } = event.target.id;
    console.log(id);
  };
  return (
    <div className={style.profileItemList}>
      <div className={style.item} onClick={onClick} id="">
        <p>쪽지함</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} onClick={onClick}>
        <p>거래/후원내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} onClick={onClick}>
        <p>후원내역</p>
        <Icon icon="bi:chevron-right"></Icon>
      </div>
      <div className={style.item} onClick={onClick}>
        <p>관심기억</p>
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
