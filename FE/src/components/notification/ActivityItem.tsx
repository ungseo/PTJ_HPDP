import React from "react";
import Grid from "@mui/material/Grid";
import style from "../../styles/css/ActivityItem.module.css";

import { OutAlarmInfoInterface } from "./../../interface/apiDataInterface";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ActivityItemProps {
  item: OutAlarmInfoInterface;
}

const ActivityItem = (props: ActivityItemProps) => {
  const navigate = useNavigate();

  const { item } = props;
  console.log("꺄오", item);

  const name = useSelector((state: any) => state.user.info.name);

  let content = "";

  switch (item.type) {
    case "CREATE":
      content = "펀딩이 등록되었습니다.";
      break;
    case "START":
      content = "펀딩이 시작되었습니다.";
      break;
    case "END":
      content = "펀딩이 종료되었습니다.";
      break;
    case "SETTLE":
      content = "펀딩 금액을 정산했습니다.";
      break;
    case "REPORT":
      content = "집행 내역을 등록했습니다.";
      break;
  }

  const onClick = () => {
    console.log("데헷", item);

    if (item.type === "CREATE") {
      console.log("드륵");
      // navigate(`/company/detail/${item.companyId}`);
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
          <div className={style.content}>2023.09.01</div>
          <div className={style.content}>{item.title}</div>
          <div className={style.content}>
            {name} 님. {content}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ActivityItem;
