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
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useSelector((state: any) => state.user.auth.accessToken);
  const saveEditHandler = () => {
    console.log(selectedImage);
    console.log(editInput);
    const formData = new FormData();
    formData.append("name", editInput.name);
    if (selectedImage) {
      console.log("파일들어감");
      formData.append("profile", selectedImage);
    }
    if (editInput.phoneNumber) {
      formData.append("phoneNumber", editInput.phoneNumber);
    }
    if (editInput.email) {
      formData.append("email", editInput.email);
    }

    updateMemberInfo(
      token,
      formData,
      (res) => {
        getMemberInfo(
          token,
          (res) => {
            console.log("유저정보 불러오기성공");
            dispatch(userActions.saveMemberInfo(res.data.data));
          },
          (err) => {
            console.log(err);
          }
        );
        alert("정보를 수정했습니다.");
      },
      (err) => {
        alert("실패" + err);
      }
    );
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
      {modal ? <PwModal modalHandler={setModal}></PwModal> : null}
    </div>
  );
};

export default ProfileEditPage;
