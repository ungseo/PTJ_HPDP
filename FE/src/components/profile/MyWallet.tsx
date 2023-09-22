import style from "../../styles/css/MyWallet.module.css";
import { Icon } from "@iconify/react";
import DefaultButton from "../common/DefaultButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MyWallet = () => {
  const userPoint = useSelector((state: any) => state.user.info.point);
  const navigate = useNavigate();
  const onClick = (event: any) => {
    const { id } = event.target;
    if (id === "reg") {
    } else if (id === "insert") {
      navigate("/payment");
    }
  };
  return (
    <div className={style.mywallet}>
      <p className={style.title}>
        포인트
        <Icon icon="bi:chevron-right"></Icon>
      </p>
      <p className={style.point}>{userPoint} P</p>
      <div className={style.buttons}>
        <DefaultButton
          id="reg"
          text="계좌등록"
          styles={{
            width: "48%",
            height: "3.5rem",
            borderRadius: "0.5rem",
            fontSize: "1.5rem",
          }}
          onClick={onClick}
        />
        <DefaultButton
          id="insert"
          text="포인트 충전"
          styles={{
            width: "48%",
            height: "3.5rem",
            borderRadius: "0.5rem",
            fontSize: "1.5rem",
          }}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default MyWallet;
