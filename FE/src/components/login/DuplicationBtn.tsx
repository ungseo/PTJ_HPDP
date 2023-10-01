import { useEffect, useState } from "react";
import { duplicationIdCheck } from "../../api/auth";
import style from "../../styles/css/DuplicationBtn.module.css";
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
        alert(res.data.message);
        setDuplicated("pass");
        setChechedId(checkingId);
        setDup(false);
      },
      (err) => {
        alert(err.response.data.message);
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
