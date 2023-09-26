import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavigationBar() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const loginType = useSelector((state: any) => state.user.auth.type);
  const location = useLocation();

  React.useEffect(() => {
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

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<RestoreIcon />}
        onClick={() => {
          navigate("/");
        }}
      />
      <BottomNavigationAction
        label="List"
        value="list"
        icon={<FavoriteIcon />}
        onClick={() => {
          navigate("/list");
        }}
      />
      <BottomNavigationAction
        label="Notification"
        value="notification"
        icon={<LocationOnIcon />}
        onClick={() => {
          navigate("/notification");
        }}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<FolderIcon />}
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
