import { Icon } from "@iconify/react";
import { pointHistoryInterface } from "./../../interface/transactionHistoryInterface";
import style from "../../styles/css/PointHistory.module.css";
import { useSelector } from "react-redux";

const PointHistory = ({ totalPoint, totalFunding }: pointHistoryInterface) => {
  const isInsert = useSelector((state: any) => state.transHistory.isInsert);
  const styles = { backgroundColor: "#25228C" };
  return (
    <div className={style.wrapper}>
      <div className={style.pointHistory} style={styles}>
        <div className={style.totalPoint}>
          <p>현재 잔여 포인트</p>
          <p>{totalPoint} P</p>
        </div>
        <div className={style.yesterdayPoint}>
          <p>전체 후원 금액</p>
          <p>{totalFunding} P</p>
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
