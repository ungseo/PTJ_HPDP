import ButtonInterface from "../../interface/commonInterface";
import style from "../../styles/css/Buttons.module.css";
const DeepBlueBtn = ({
  text,
  disabled,
  onClick,
  id,
  styles,
  type,
}: ButtonInterface) => {
  return (
    <button
      className={style.deeepBlueButton}
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

export default DeepBlueBtn;
