import style from "../../styles/css/HashTagButton.module.css";
import ButtonInterface from "../../interface/commonInterface";

const HashTagButton = ({ id, onClick, styles, text }: ButtonInterface) => {
  return (
    <button className={style.button} id={id} onClick={onClick} style={styles}>
      {text}
    </button>
  );
};

export default HashTagButton;
