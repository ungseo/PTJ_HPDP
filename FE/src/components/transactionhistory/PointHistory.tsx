import { Icon } from "@iconify/react";
import { transactionHistoryInterface } from "../../interface/transactionHistoryInterface";
import style from "../../styles/css/PointHistory.module.css";
import { useState } from "react";
import PointHistoryModal from "./PointHistoryModal";
import { useSelector } from "react-redux";
const PointHistory = ({
  totalPoint,
  yesterdayPoint,
}: transactionHistoryInterface) => {
  const isInsert = useSelector((state: any) => state.transHistory.isInsert);
  const styles = isInsert
    ? { backgroundColor: "#25228C" }
    : { backgroundColor: "#FB788E" };
  const [openModal, setOpenModal] = useState(false);
  const modalHandler = () => {
    setOpenModal(!openModal);
    console.log(openModal);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.pointHistory} style={styles}>
        <div className={style.totalPoint}>
          <p>포인트</p>
          <p>{totalPoint} P</p>
        </div>
        <div className={style.yesterdayPoint}>
          <p>어제 충전된 포인트</p>
          <p>{yesterdayPoint} P</p>
        </div>
        <div className={style.modalIcon}>
          {openModal ? (
            <Icon icon="bi:caret-up-fill" onClick={modalHandler}></Icon>
          ) : (
            <Icon icon="bi:caret-down-fill" onClick={modalHandler}></Icon>
          )}
        </div>
      </div>
      {openModal && <PointHistoryModal color={isInsert} />}
    </div>
  );
};

export default PointHistory;
