import { useNavigate } from "react-router-dom";
import style from "../../styles/css/TopBar.module.css";
import { Icon } from "@iconify/react";

const LogoTopbar = () => {
  const navigate = useNavigate();

  const goToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className={style.logoTopbar}>
      <div className={style.leftCpnt}>
        <div className={style.logoName}>한푼두푼</div>
      </div>
      <Icon
        icon="bi:search"
        onClick={goToSearchPage}
        style={{ width: "1.8rem", height: "1.8rem", marginRight: "1rem" }}
      />
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
        <Icon
          icon="bi:chevron-left"
          className={style.icon}
          width="1.9rem"
          color="black"
          onClick={goBackHandler}
        />
        <div className={style.title_name}>{text}</div>
      </div>
      <Icon
        icon="bi:search"
        onClick={goToSearchPage}
        style={{ width: "1.8rem", height: "1.8rem", marginRight: "1rem" }}
      />
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

const BackTopbar = () => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <div className={style.backTopbar}>
      <button className={style.backBtn} onClick={goBackHandler}></button>
    </div>
  );
};

export { LogoTopbar, OptionTopbar, DefaultTopbar, BackTopbar };
