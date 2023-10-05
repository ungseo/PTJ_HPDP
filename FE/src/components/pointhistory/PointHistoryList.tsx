import style from "../../styles/css/HistoryList.module.css";
import DefaultButton from "../common/DefaultButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { transHistoryActions } from "../../store/transHistory-slice";
import PointHistoryItem from "../PointHistoryItem";
import { OutPointHistoryInterface } from "./../../interface/apiDataInterface";

interface PointHistoryListProps {
  pointList: OutPointHistoryInterface[];
}

const PointHistoryList = (props: PointHistoryListProps) => {
  const { pointList } = props;

  const dispatch = useDispatch();

  const isInsert = useSelector((state: any) => state.transHistory.isInsert);

  const onClick = () => {
    dispatch(transHistoryActions.insertSwitchHandler());
  };
  const buttonProps = {
    text: isInsert ? "후원내역" : "전체내역",
    style: { backgroundColor: "#fb788e" },
  };

  return (
    <div className={style.wrapper}>
      <div className={style.label}>
        <div className={style.text}>{isInsert ? "전체내역" : "후원내역"}</div>
        <DefaultButton
          text={buttonProps.text}
          styles={buttonProps.style}
          onClick={onClick}
        />
      </div>
      <hr />
      {isInsert ? (
        <div>
          {pointList.length > 0 ? (
            pointList.map((item, index) => (
              <div key={index}>
                <PointHistoryItem item={item}></PointHistoryItem>
                <hr />
              </div>
            ))
          ) : (
            <div>거래내역이 없습니다.</div>
          )}
        </div>
      ) : (
        <div>
          {pointList.length > 0 ? (
            pointList
              .filter((item) => item.flag === true)
              .map((item, index) => (
                <div key={index}>
                  <PointHistoryItem item={item}></PointHistoryItem>
                  <hr />
                </div>
              ))
          ) : (
            <div>null</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PointHistoryList;
