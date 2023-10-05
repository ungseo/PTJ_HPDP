import style from "../../styles/css/TestWalletRegistration.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const TestWalletRegistration = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/testbank/register");
  };

  return (
    <div className={style.wrapper} onClick={handleClick}>
      <p>계좌를 등록해주세요.</p>
      <Icon icon={"bi-plus-circle-dotted"} />
    </div>
  );
};

export default TestWalletRegistration;
