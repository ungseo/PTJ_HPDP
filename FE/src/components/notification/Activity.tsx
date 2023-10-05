import React, { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import { getAlarms } from "../../api/alarms";
import { useSelector } from "react-redux";
import NullModal from "../common/NullModal";

const Activity = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [alarmData, setAlarmData] = useState([]);

  useEffect(() => {
    getAlarms(
      accessToken,
      (res) => {
        setAlarmData(res.data.data.reverse());
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <div>
      {alarmData.length > 0 ? (
        alarmData.map((item, index) => <ActivityItem key={index} item={item} />)
      ) : (
        <NullModal text="알림내역이 없습니다." />
      )}
    </div>
  );
};

export default Activity;
