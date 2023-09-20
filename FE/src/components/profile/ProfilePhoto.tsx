import { useSelector } from "react-redux";
import style from "../../styles/css/ProfilePhotho.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import PhotoEditButton from "./PhotoEditButton";
import { ProfilePhotoInterFace } from "../../interface/profilePageInterface";

const ProfilePhoto = ({ styles }: ProfilePhotoInterFace) => {
  const navigate = useNavigate();
  const isLogined = useSelector((state: any) => state.user.auth.isLogined);
  const isEditPage = useSelector((state: any) => state.ui.isEditPage);
  const profilePhotoURL = isLogined ? "/nonProfile.png" : "/nonProfile.png";
  const goToEditPage = () => {
    navigate(`/profile/edit/${userId}`);
  };

  const userId = useSelector((state: any) => state.user.auth.memberId);
  return (
    <div className={style.profilePhoto}>
      <div className={style.photoWrapper}>
        <img
          className={style.img}
          src={profilePhotoURL}
          style={styles}
          alt="프사"
        />
        {isEditPage && <PhotoEditButton />}
      </div>
      {isLogined && !isEditPage ? (
        <div className={style.p} onClick={goToEditPage}>
          <p>{"유저이름"}</p>
          <Icon icon="bi:gear-fill"></Icon>
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePhoto;
