import { OptionTopbar } from "../components/common/TopBar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ProfileWrapper from "../components/profile/ProfileWrapper";
const ProfilePage = () => {
  return (
    <div>
      <OptionTopbar text="내 정보" />
      <ProfileWrapper />
    </div>
  );
};

export default ProfilePage;
