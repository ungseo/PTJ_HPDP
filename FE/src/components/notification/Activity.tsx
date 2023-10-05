import React, { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import { getAlarms } from "../../api/alarms";
import { useSelector } from "react-redux";
import NullModal from "../common/NullModal";

const Activity = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [alarmData, setAlarmData] = useState([]);
  console.log("test", alarmData);

  // const dummy = [
  //   {
  //     companyId: 1,
  //     companyName: "NoPlasticSunday",
  //     date: "2023년 10월 05일 08:26:51",
  //     fundingsDocs: null,
  //     fundingId: 5,
  //     newsAlarmId: 6,
  //     read: false,
  //     thumbnail:
  //       "https://cdn.pixabay.com/photo/2018/01/24/15/08/live-3104077_640.jpg",
  //     title: "환경을 위한 숲 조성 활동에 후원해주세요!",
  //     type: "CREATE",
  //   },
  //   {
  //     companyId: 8,
  //     companyName: "NoPlasticSunday",
  //     date: "2023년 10월 05일 08:29:14",
  //     fundingsDocs: null,
  //     fundingId: 10,
  //     newsAlarmId: 12,
  //     read: false,
  //     thumbnail:
  //       "https://cdn.pixabay.com/photo/2023/09/18/13/51/cat-8260638_640.jpg",
  //     title:
  //       "늘어나는 해양 쓰레기에 앓고 있는 제주 바다 정화 활동에 후원해 주세요!",
  //     type: "CREATE",
  //   },
  // ];

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
