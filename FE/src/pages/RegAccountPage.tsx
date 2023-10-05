import { Icon } from "@iconify/react";
import { OptionTopbar } from "../components/common/TopBar";
import style from "../styles/css/RegAccountPage.module.css";
const RegAccountPage = () => {
  const registerHandler = () => {
    alert("Register");
  };
  return (
    <div>
      <OptionTopbar text="test bank" />
      <div className={style.wrapper} onClick={registerHandler}>
        <p className={style.p}>계좌를 등록해주세요</p>
        <Icon className={style.icon} icon="bi-plus-circle-dotted" />
      </div>
    </div>
  );
};

export default RegAccountPage;
