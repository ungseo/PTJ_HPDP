import { useEffect, useState } from "react";
import style from "../../styles/css/HistoryList.module.css";
import DefaultButton from "../common/DefaultButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { transHistoryActions } from "../../store/transHistory-slice";
import { getChargeList } from "../../api/points";
import PointHistoryItem from "../PointHistoryItem";

const PointHistoryList = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [pointList, setPointList] = useState([]);

  useEffect(() => {
    getChargeList(
      accessToken,
      (res) => {
        setPointList(res.data.data.reverse());
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  const dispatch = useDispatch();
  const isInsert = useSelector((state: any) => state.transHistory.isInsert);
  const onClick = () => {
    dispatch(transHistoryActions.insertSwitchHandler());
  };
  const buttonProps = {
    text: isInsert ? "후원내역" : "전체내역",
    style: { backgroundColor: "#25228C" },
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
          {pointList.map((item, index) => (
            <div>
              <PointHistoryItem item={item}></PointHistoryItem>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {pointList
            // .filter((item) => item.flag === 1)
            .map((item, index) => (
              <div key={index}>
                <PointHistoryItem item={item}></PointHistoryItem>
                <hr />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PointHistoryList;
