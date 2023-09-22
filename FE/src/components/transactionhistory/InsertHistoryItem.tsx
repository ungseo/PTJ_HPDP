import style from "../../styles/css/InsertHistoryItem.module.css";

interface HistoryItem {
  date: string;
  Name: string;
  Point: number;
  balancePoint: number;
}

const InsertHistoryItem = ({
  date,
  Name,
  Point,
  balancePoint,
}: HistoryItem) => {
  return (
    <div className={style.wrapper}>
      <p className={style.date}>{date}</p>
      <div className={style.content}>
        <p className={style.content_title}>{Name}</p>
        <p className={style.content_point}>{Point} P</p>
      </div>
      <p className={style.remain_point}>{balancePoint} P</p>
    </div>
  );
};

export default InsertHistoryItem;
