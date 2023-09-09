import { useNavigate } from "react-router-dom";
import style from "../../styles/css/TopBar.module.css";

const LogoTopbar = () => {
  return (
    <div className={style.logoTopbar}>
      <img src="" alt="LOGO" />
      <h1 className={style.logoName}>한푼두푼</h1>
    </div>
  );
};

const OptionTopbar = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  const goSearchHandler = () => {
    navigate("/search");
  };
  return (
    <div className={style.optionTopbar}>
      <div className={style.leftCpnt}>
        <button className={style.backBtn} onClick={goBackHandler}></button>
        <h2>{text}</h2>
      </div>
      <button className={style.searchBtn} onClick={goSearchHandler}></button>
    </div>
  );
};

export { LogoTopbar, OptionTopbar };
