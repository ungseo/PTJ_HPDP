import React, { useEffect } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import Activity from "../components/notification/Activity";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  // 로그인 Y
  //   알람 API
  // 로그인 N
  //   로그인 페이지 이동
  const navigate = useNavigate();

  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  useEffect(() => {
    if (isLogined) {
      console.log("로그인 Y");
    } else {
      console.log("로그인 N");
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <OptionTopbar text={"알림"} />
      <div>
        <Activity></Activity>
      </div>
    </div>
  );
};

export default NotificationPage;
