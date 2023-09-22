import { useState } from "react";
import AnimationLabelInput from "../common/Inputs";
import DefaultButton from "../common/DefaultButton";
import UserAddressModal from "./UserAddressModal";
import { useSelector } from "react-redux";
import { EditInputInterface } from "../../interface/profilePageInterface";

const ProfileEditList = ({ editInput, setEditInput }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const userId = useSelector((state: any) => state.user.info.loginId);
  const modalOpener = () => {
    setModalOpen(true);
  };
  const modalCloser = () => {
    setModalOpen(false);
  };
  const onChange = (event: any) => {
    const { id, value } = event.target;
    setEditInput((prev: EditInputInterface) => ({ ...prev, [id]: value }));
  };
  console.log(editInput);
  return (
    <div style={{ padding: "1.5rem" }}>
      <AnimationLabelInput
        labelTitle="Id"
        type="text"
        value={userId}
        disabled={true}
      />
      <AnimationLabelInput
        id="name"
        labelTitle="Name"
        type="text"
        value={editInput.name}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="email"
        labelTitle="Email"
        type="text"
        value={editInput.email}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="phoneNumber"
        labelTitle="Phone Number"
        type="text"
        value={editInput.phoneNumber}
        onChange={onChange}
      />
      <div
        style={{
          position: "relative",
          padding: "0 1.5rem",
          boxSizing: "content-box",
        }}
      >
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
            right: "1.5rem",
            margin: "1rem auto auto auto",
            width: "4rem",
          }}
          onClick={modalOpener}
        />
        <div style={{ padding: "0 1.5rem" }}>
          <AnimationLabelInput labelTitle="상세주소" type="text" />
        </div>
      </div>
      {modalOpen && <UserAddressModal />}
    </div>
  );
};

export default ProfileEditList;
