import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import style from "../../styles/css/ActivityItem.module.css";
import { OutAlarmInfoInterface } from "./../../interface/apiDataInterface";
import { useNavigate } from "react-router-dom";
import { readAlarms } from "../../api/alarms";
import { useSelector } from "react-redux";

interface ActivityItemProps {
  item: OutAlarmInfoInterface;
}

const ActivityItem = (props: ActivityItemProps) => {
  const navigate = useNavigate();

  const { item } = props;

  let head = null;
  let body = undefined;

  switch (item.type) {
    case "CREATE":
      head = `${item.companyName}`;
      body = `${item.title} 프로젝트가 등록되었습니다.`;
      break;
    case "START":
      head = `${item.companyName}`;
      body = `${item.title} 프로젝트가 시작되었습니다.`;
      break;
    case "END":
      head = `${item.title}`;
      body = `${item.title} 프로젝트가 종료되었습니다.`;
      break;
    case "SETTLE":
      head = `${item.title}`;
      body = `프로젝트의 후원 금액이 정산되었습니다.`;
      break;
    case "REPORT":
      head = `${item.companyName}`;
      body = `프로젝트의 집행 내역이 등록되었습니다.`;
      break;
  }

  const [read, setRead] = useState(item.read);

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const onClick = () => {
    if (!read) {
      readAlarms(
        accessToken,
        item.newsAlarmId,
        (res) => {
          console.log("응애");
          setRead(true);
        },
        (err) => {
          console.error(err);
        }
      );
    }

    if (item.type === "CREATE") {
      navigate(`/company/detail/${item.companyId}`);
    } else {
      navigate(`/funding/detail/${item.fundingId}`);
    }
  };

  const wrapperStyle = {
    backgroundColor: read ? "white" : "#f3f3f3",
  };

  return (
    <Grid container onClick={onClick} style={wrapperStyle}>
      <Grid item xs={3} className={style.imgfield}>
        <img src={item.thumbnail} alt="unavailable" className={style.img} />
      </Grid>
      <Grid item xs={9} className={style.contentfield}>
        <div className={style.contentbox}>
          <div className={style.content}>{item.date}</div>
          <div className={style.content}>{head}</div>
          <div className={style.content}>{body}</div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ActivityItem;
