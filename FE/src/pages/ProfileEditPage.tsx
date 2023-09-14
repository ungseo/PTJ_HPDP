import { useEffect, useState } from "react";
import { OptionTopbar } from "../components/common/TopBar";
import ProfilePhoto from "../components/profile/ProfilePhoto";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import ProfileEditList from "../components/profile/ProfileEditList";
import UserAddressModal from "../components/profile/UserAddressModal";
import AnimationLabelInput from "../components/common/Inputs";
import DefaultButton from "../components/common/Buttons";

const ProfileEditPage = () => {
  const test = useSelector((state: any) => state.ui.isEditPage);
  const [inputAddress, setInputAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const modalOpener = () => {
    setModalOpen(true);
  };
  const modalCloser = () => {
    setModalOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiActions.inEditPage());
    console.log(test);
  }, []);

  return (
    <div>
      {/* 각 인풋 밸류에 사용자 정보 기본으로 등록해놓기 */}
      <OptionTopbar text="회원정보수정" />
      <ProfilePhoto styles={{ width: "8rem", height: "8rem" }} />
      <ProfileEditList />
      <div style={{ position: "relative" }}>
        <AnimationLabelInput
          labelTitle="주소(우편번호)"
          value={inputAddress}
          type="text"
        />
        <DefaultButton
          text="찾기"
          styles={{
            position: "absolute",
            top: "0",
            right: "0",
            margin: "1rem auto auto auto",
            width: "4rem",
          }}
          onClick={modalOpener}
        />
      </div>
      <AnimationLabelInput labelTitle="상세주소" type="text" />
      {modalOpen && <UserAddressModal />}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "red" }}>회원탈퇴</span>
        <DefaultButton text="비밀번호 변경" />
      </div>
      <DefaultButton text="저장" styles={{ width: "9rem", height: "3.5rem" }} />
    </div>
  );
};

export default ProfileEditPage;
