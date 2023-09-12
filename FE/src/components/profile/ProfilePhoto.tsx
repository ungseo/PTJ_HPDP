import { useSelector } from "react-redux";
import style from "../../styles/css/ProfilePhotho.module.css";
const ProfilePhoto = () => {
  const isLogined = useSelector((state: any) => state.user.isLogined);
  const profilePhotoURL = isLogined ? "/nonProfile.png" : "/nonProfile.png";
  return (
    <div className={style.profilePhoto}>
      <img className={style.img} src={profilePhotoURL} alt="프사" />
    </div>
  );
};

export default ProfilePhoto;
