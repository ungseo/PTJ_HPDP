import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Badge from "@mui/material/Badge";

export default function NavigationBar() {
  const navigate = useNavigate();

  const location = useLocation();

  const [value, setValue] = React.useState("home");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const loginType = useSelector((state: any) => state.user.auth.type);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue("home");
        break;
      case "/list":
        setValue("list");
        break;
      case "/notification":
        setValue("notification");
        break;
      case "/profile":
        setValue("profile");
        break;
      default:
        setValue("");
    }
  }, [location.pathname]);

  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  const alarmCount = useSelector((state: any) => state.ui.alarmCount);

  const notificationIcon = isLogined ? (
    <Badge badgeContent={alarmCount} color="error">
      <MarkEmailUnreadIcon />
    </Badge>
  ) : (
    <MarkEmailUnreadIcon />
  );

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction
        style={{ color: value === "home" ? "#fb788e" : "gray" }}
        label="Home"
        value="home"
        icon={<HomeIcon />}
        onClick={() => {
          navigate("/");
        }}
      />
      <BottomNavigationAction
        style={{ color: value === "list" ? "#fb788e" : "gray" }}
        label="List"
        value="list"
        icon={<ListAltIcon />}
        onClick={() => {
          navigate("/list");
        }}
      />
      <BottomNavigationAction
        style={{ color: value === "notification" ? "#fb788e" : "gray" }}
        label="Notification"
        value="notification"
        icon={notificationIcon}
        onClick={() => {
          navigate("/notification");
        }}
      />
      <BottomNavigationAction
        style={{ color: value === "profile" ? "#fb788e" : "gray" }}
        label="Profile"
        value="profile"
        icon={<AccountBoxIcon />}
        onClick={() => {
          if (loginType === 1) {
            navigate("/profile/c");
          } else {
            navigate("/profile");
          }
        }}
      />
    </BottomNavigation>
  );
}
