import { useNavigate } from "react-router-dom";
import style from "../../styles/css/TopBar.module.css";

const LogoTopbar = () => {
  const navigate = useNavigate();
  const goToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div className={style.logoTopbar}>
      <div className={style.leftCpnt}>
        <div>
          <img className={style.logo} src="/hpdpLogo.png" alt="LOGO" />
        </div>
        <h1 className={style.logoName}>한푼두푼</h1>
      </div>
      <button className={style.searchBtn} onClick={goToSearchPage}></button>
    </div>
  );
};

const OptionTopbar = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  const goToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div className={style.optionTopbar}>
      <div className={style.leftCpnt}>
        <button className={style.backBtn} onClick={goBackHandler}></button>
        <h3>{text}</h3>
      </div>
      <button className={style.searchBtn} onClick={goToSearchPage}></button>
    </div>
  );
};

const DefaultTopbar = (text: string) => {
  return (
    <div className={style.defaultTopbar}>
      <h3>{text}</h3>
    </div>
  );
};

export { LogoTopbar, OptionTopbar };
