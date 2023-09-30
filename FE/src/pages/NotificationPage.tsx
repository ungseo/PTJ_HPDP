import React, { useEffect } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import CustomizedTabs from "./../components/CustomizedTabs";
import Activity from "../components/notification/Activity";
import Message from "../components/notification/Message";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  // 로그인 Y
  //   알람 API
  // 로그인 N
  //   로그인 페이지 이동

  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogined) {
      console.log("로그인 Y");
    } else {
      console.log("로그인 N");
      navigate("/login");
    }
  }, []);

  const tabProps = {
    활동: <Activity />,
    쪽지: <Message />,
  };

  return (
    <div>
      <OptionTopbar text={"알림"} />
      <CustomizedTabs tabProps={tabProps} />
    </div>
  );
};

export default NotificationPage;
