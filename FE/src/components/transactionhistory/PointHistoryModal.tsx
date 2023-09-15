import { transactionHistoryModalInterface } from "../../interface/transactionHistoryInterface";
import style from "../../styles/css/PointHistoryModal.module.css";
const PointHistoryModal = ({ color }: transactionHistoryModalInterface) => {
  const styles = color
    ? { backgroundColor: "#6096FD" }
    : { backgroundColor: "#FBC6D2" };
  return (
    <div className={style.modal} style={styles}>
      <div className={style.header}>
        <p>기간별 후원 총 금액</p>
        <div>
          <input type="radio" name="3" id="3" />
          <label htmlFor="3">~3개월</label>
        </div>
        <div>
          <input type="radio" name="6" id="6" />
          <label htmlFor="6">~6개월</label>
        </div>
        <div>
          <input type="radio" name="12" id="12" />
          <label htmlFor="12">~1년</label>
        </div>
      </div>
      <div className={style.point}>
        <p>{"1,234,567"} P</p>
      </div>
    </div>
  );
};

export default PointHistoryModal;
