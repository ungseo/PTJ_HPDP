import LoginInfo from "./LoginInfo";
import NonLoginInfo from "./NonLoginInfo";
import ProfilePhoto from "./ProfilePhoto";
import { useSelector } from "react-redux";
const ProfileWrapper = () => {
  const isLogined = useSelector((state: any) => {
    console.log(state.user.auth);
    return state.user.auth.isLogined;
  });
  console.log(isLogined);
  return (
    <div>
      <ProfilePhoto />
      {isLogined ? <LoginInfo /> : <NonLoginInfo />}
    </div>
  );
};

export default ProfileWrapper;
