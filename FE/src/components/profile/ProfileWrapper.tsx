import { useEffect } from "react";
import ProfileActivity from "./ProfileActivity";
import ProfilePhoto from "./ProfilePhoto";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProfileWrapper = () => {
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

  return (
    <div>
      <ProfilePhoto />
      <ProfileActivity />
    </div>
  );
};

export default ProfileWrapper;
