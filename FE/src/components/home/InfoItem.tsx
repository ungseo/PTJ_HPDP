import style from "../../styles/css/InfoItem.module.css";
import { InfoItemInterface } from "../../interface/homePageInterface";
import AscendingNumber from "../common/AscendingNumber";

const InfoItem = ({ imgSrc, text, num, unit }: InfoItemInterface) => {
  return (
    <div className={style.wrapper}>
      <img className={style.image} src={imgSrc} alt="info사진" />
      <div className={style.text}>{text}</div>
      <div>
        <AscendingNumber num={num} unit={unit} fs="1.25rem" />
      </div>
    </div>
  );
};

export default InfoItem;
