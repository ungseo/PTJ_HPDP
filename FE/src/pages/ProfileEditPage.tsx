import { useEffect, useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import ProfilePhoto from "../components/profile/ProfilePhoto";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import ProfileEditList from "../components/profile/ProfileEditList";
import UserAddressModal from "../components/profile/UserAddressModal";
import AnimationLabelInput from "../components/common/Inputs";
import DefaultButton from "../components/common/DefaultButton";
import { profileEditActions } from "../store/profileEdit-slice";
import { getMemberInfo, updateMemberInfo } from "../api/members";
import { userActions } from "../store/user-slice";
import PwModal from "../components/profile/PwModal";
import style from "../styles/css/ProfileEditPage.module.css";
import { NotOkModal, OkModal } from "../components/common/AlertModals";
import LoadingSpinner from "../components/common/LoadingSpinner";
const ProfileEditPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiActions.inEditPage());
  }, []);
  const userInfo = useSelector((state: any) => state.user.info);
  const [editInput, setEditInput] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phoneNumber: userInfo.phoneNumber,
  });
  const [onGoing, setOnGoing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useSelector((state: any) => state.user.auth.accessToken);
  const saveEditHandler = () => {
    const formData = new FormData();
    formData.append("name", editInput.name);
    if (selectedImage) {
      formData.append("profile", selectedImage);
    }
    if (editInput.phoneNumber) {
      formData.append("phoneNumber", editInput.phoneNumber);
    }
    if (editInput.email) {
      formData.append("email", editInput.email);
    }
    setOnGoing(true);
    updateMemberInfo(
      token,
      formData,
      (res) => {
        getMemberInfo(
          token,
          (res) => {
            dispatch(userActions.saveMemberInfo(res.data.data));
          },
          (err) => {}
        );
        OkModal({ title: "성공", text: "정보를 수정했습니다." });
      },
      (err) => {
        NotOkModal({ title: "실패", text: `정보수정을 실패 했습니다. ${err}` });
      }
    );
    setOnGoing(false);
  };
  const [modal, setModal] = useState(false);
  const modalHandler = () => {
    setModal(true);
  };
  return (
    <div>
      {/* 각 인풋 밸류에 사용자 정보 기본으로 등록해놓기 */}
      <OptionTopbar text="회원정보수정" />
      <ProfilePhoto
        styles={{ width: "8rem", height: "8rem" }}
        setSelectedImage={setSelectedImage}
      />
      <div
        style={{
          borderRadius: "1.5rem 1.5rem 0 0",
          backgroundColor: "#f3f3f3",
          position: "absolute",
          width: "100%",
          top: "30vh",
          height: "70vh",
        }}
        className={style.animate}
      >
        <ProfileEditList setEditInput={setEditInput} editInput={editInput} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1.5rem",
          }}
        >
          <span style={{ color: "red" }}>회원탈퇴</span>
          <DefaultButton text="비밀번호 변경" onClick={modalHandler} />
        </div>
        <DefaultButton
          text="저장"
          styles={{ width: "9rem", height: "3.5rem" }}
          onClick={saveEditHandler}
        />
        {modal ? <PwModal modalHandler={setModal} /> : null}
      </div>
      {onGoing && <LoadingSpinner />}
    </div>
  );
};

export default ProfileEditPage;
