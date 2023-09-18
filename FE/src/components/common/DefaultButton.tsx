import style from "../../styles/css/Buttons.module.css";
import ButtonInterface from "../../interface/commonInterface";

const DefaultButton = ({
  text,
  disabled,
  onClick,
  id,
  styles,
  type,
}: ButtonInterface) => {
  return (
    <button
      className={style.defaultBtn}
      id={id}
      onClick={onClick}
      disabled={disabled}
      style={styles}
      type={type}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
