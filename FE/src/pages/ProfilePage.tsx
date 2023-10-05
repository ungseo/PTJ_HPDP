import { OptionTopbar } from "../components/common/TopBar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ProfileWrapper from "../components/profile/ProfileWrapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "../store/ui-slice";
import style from "../styles/css/ProfilePage.module.css";
const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiActions.notInEditPage());
  }, []);

  return (
    <div className={style.page}>
      <ProfileWrapper />
    </div>
  );
};

export default ProfilePage;
