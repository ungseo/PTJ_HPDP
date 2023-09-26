import { useState } from "react";
import style from "../../styles/css/PwModal.module.css";
import DefaultButton from "../common/DefaultButton";
import { updatePassword } from "../../api/members";
import { useSelector } from "react-redux";

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
        alert("비밀번호가 변경되었습니다!");
      },
      (err) => {
        console.log(err, "비번변경실패");
      }
    );
  };
  return (
    <div className={style.wrapper}>
      <h1>비밀번호변경</h1>
      <input type="password" value={editPw} onChange={onChange} />
      <DefaultButton text="변경" onClick={changePw} />
    </div>
  );
};

export default PwModal;
