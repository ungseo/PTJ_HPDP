import { useNavigate } from "react-router-dom";
import style from "../../styles/css/TopBar.module.css";
import SearchButton from "./SearchButton";
import { useSelector } from "react-redux";
import styleInterface from "../../interface/styleInterface";
const LogoTopbar = () => {
  return (
    <div className={style.logoTopbar}>
      <img src="" alt="LOGO" />
      <h1 className={style.logoName}>한푼두푼</h1>
    </div>
  );
};

const OptionTopbar = ({ text }: { text: string }) => {
  const isFocused = useSelector((state: any) => state.ui.focusOnSearchButton);
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  const styled: styleInterface = isFocused ? { visibility: "hidden" } : {};
  console.log(isFocused);

  return (
    <div className={style.optionTopbar}>
      <div className={style.leftCpnt} style={styled}>
        <button className={style.backBtn} onClick={goBackHandler}></button>
        <h2>{text}</h2>
      </div>
      {/* <button className={style.searchBtn} onClick={goSearchHandler}></button>*/}
      <div className={style.searchBtn}>
        <SearchButton />
      </div>
    </div>
  );
};

export { LogoTopbar, OptionTopbar };
