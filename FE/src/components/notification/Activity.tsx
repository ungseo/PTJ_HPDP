import React, { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import { getAlarms } from "../../api/alarms";
import { useSelector } from "react-redux";

const dummy = [
  {
    fundingId: 1,
    type: "CREATE",
    title: "후원을 등로오옥 합니다아아아",
    isRead: false,
    thumnail: "string",
  },
  {
    fundingId: 1,
    type: "START",
    title: "후원을 시자아악 합니다아아아",
    isRead: false,
    thumnail: "string",
  },
];

const Activity = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [alarmData, setAlarmData] = useState([]);
  console.log("헤헤", alarmData);

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
      {dummy.map((item, index) => (
        <ActivityItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Activity;
