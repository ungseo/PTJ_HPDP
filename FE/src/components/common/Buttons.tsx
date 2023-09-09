import style from "../../styles/css/Buttons.module.css";
import ButtonInterface from "../../interface/commonInterface";

const DefaultButton = ({
  text,
  disabled,
  onClick,
  id,
  styles,
}: ButtonInterface) => {
  return (
    <button
      className={style.defaultBtn}
      id={id}
      onClick={onClick}
      disabled={disabled}
      style={styles}
    >
      {text}
    </button>
  );
};
export default DefaultButton;
