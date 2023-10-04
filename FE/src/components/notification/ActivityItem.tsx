import React from "react";
import Grid from "@mui/material/Grid";
import style from "../../styles/css/ActivityItem.module.css";
import { OutAlarmInfoInterface } from "./../../interface/apiDataInterface";
import { useNavigate } from "react-router-dom";

interface ActivityItemProps {
  item: OutAlarmInfoInterface;
}

const ActivityItem = (props: ActivityItemProps) => {
  const navigate = useNavigate();

  const { item } = props;
  console.log("꺄오", item);

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

  const onClick = () => {
    console.log("데헷", item);

    if (item.type === "CREATE") {
      console.log("드륵");
      navigate(`/company/detail/${item.companyId}`);
    } else {
      console.log("끼룩");
      navigate(`/funding/detail/${item.fundingId}`);
    }
  };

  return (
    <Grid container onClick={onClick}>
      <Grid item xs={3} className={style.imgfield}>
        <img src={item.thumnail} alt="" />
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
