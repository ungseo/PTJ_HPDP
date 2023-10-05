import { useState } from "react";
import style from "../../styles/css/PwModal.module.css";
import DefaultButton from "../common/DefaultButton";
import { updatePassword } from "../../api/members";
import { useSelector } from "react-redux";
import { NotOkModal, OkModal } from "../common/AlertModals";

const PwModal = ({ modalHandler }: any) => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [editPw, setEditPw] = useState("");
  const onChange = (event: any) => {
    const { value } = event.target;
    setEditPw(value);
  };
  const changePw = () => {
    const loginPw = editPw;
    updatePassword(
      accessToken,
      loginPw,
      (res) => {
        OkModal({ title: "성공", text: "비밀번호가 변경되었습니다." });
      },
      (err) => {
        NotOkModal({
          title: "실패",
          text: "비밀번호가 변경되지 않았습니다. 다시 시도해주세요.",
        });
      }
    );
  };
  const closeModal = () => {
    modalHandler(false);
  };
  const [auth, setAuth] = useState(false);
  return (
    <div className={style.wrapper}>
      <div className={style.modal}>
        <button className={style.button} onClick={closeModal}>
          X
        </button>
        <h1>비밀번호변경</h1>
        <input type="password" value={editPw} onChange={onChange} />
        <DefaultButton text="변경" onClick={changePw} />
      </div>
    </div>
  );
};

export default PwModal;
