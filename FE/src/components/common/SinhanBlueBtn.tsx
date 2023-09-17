import ButtonInterface from "../../interface/commonInterface";
import style from "../../styles/css/Buttons.module.css";
const SinhanBlueBtn = ({
  text,
  disabled,
  onClick,
  id,
  styles,
  type,
}: ButtonInterface) => {
  return (
    <button
      className={style.sinhanBlueButton}
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

export default SinhanBlueBtn;
