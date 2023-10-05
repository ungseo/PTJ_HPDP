import { useEffect, useState } from "react";
import { duplicationIdCheck } from "../../api/auth";
import style from "../../styles/css/DuplicationBtn.module.css";
import { NotOkModal, OkModal } from "../common/AlertModals";
const DuplicationBtn = ({
  checkingId,
  setDup,
}: {
  checkingId: string;
  setDup: any;
}) => {
  const [duplicated, setDuplicated] = useState("");
  const [checkedId, setChechedId] = useState("");
  const onClick = (event: any) => {
    event.preventDefault();
    duplicationIdCheck(
      checkingId,
      (res) => {
        OkModal({ title: "성공", text: res.data.message });
        setDuplicated("pass");
        setChechedId(checkingId);
        setDup(false);
      },
      (err) => {
        NotOkModal({ title: "실패", text: "아이디가 중복입니다." });
        setDuplicated("duplicated");
        setChechedId(checkingId);
        setDup(true);
      }
    );
  };
  useEffect(() => {
    if (checkedId !== checkingId) {
      setDuplicated("");
      setDup(true);
    }
  }, [checkingId]);

  const styles =
    duplicated === "duplicated"
      ? { backgroundColor: "red" }
      : duplicated === "pass"
      ? { backgroundColor: "#031888" }
      : undefined;
  const message =
    duplicated === "duplicated"
      ? "사용불가"
      : duplicated === "pass"
      ? "사용가능"
      : "중복체크";
  return (
    <div className={style.Button}>
      <button className={duplicated} onClick={onClick} style={styles}>
        {message}
      </button>
    </div>
  );
};

export default DuplicationBtn;
