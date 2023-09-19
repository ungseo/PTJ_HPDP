import LoginInfo from "./LoginInfo";
import NonLoginInfo from "./NonLoginInfo";
import ProfilePhoto from "./ProfilePhoto";
import { useSelector } from "react-redux";
const ProfileWrapper = () => {
  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  return (
    <div>
      <ProfilePhoto />
      {isLogined ? <LoginInfo /> : <NonLoginInfo />}
    </div>
  );
};

export default ProfileWrapper;
