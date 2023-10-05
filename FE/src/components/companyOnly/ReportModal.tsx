import { useSelector } from "react-redux";
import style from "../../styles/css/ReportModal.module.css";
import { registerReport } from "../../api/fundings";
import { useState } from "react";
import { NotOkModal, OkModal, QuestionModal } from "../common/AlertModals";
import { useNavigate } from "react-router-dom";

const ReportModal = ({ cM, fundingId, cC }: any) => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [file, setFile] = useState(null);

  const regReport = () => {
    const data = new FormData();
    data.append("fundingId", fundingId);
    if (file) {
      data.append("docs", file);
      registerReport(
        accessToken,
        data,
        (res) => {
          OkModal({
            title: "성공",
            text: "보고서 등록에 성공했습니다.",
          }).then((res) => {
            window.location.reload();
          });
        },
        (err) => {
          NotOkModal({ title: "실패", text: "보고서 등록에 실패했습니다." });
        }
      );
    } else {
      alert("파일을 등록해주세요!");
      QuestionModal({ title: "다시", text: "파일을 올려주세요!" });
    }
  };
  const fileUploadHandler = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const closeModalHandler = (event: any) => {
    event.stopPropagation();
    cM(false);
  };
  return (
    <div className={style.modal}>
      <div className={style.xbutton}>
        <button onClick={closeModalHandler}>X</button>
      </div>
      <h2>보고서 등록</h2>
      <input type="file" onChange={fileUploadHandler} />
      <button onClick={regReport}>제출하기</button>
    </div>
  );
};

export default ReportModal;
