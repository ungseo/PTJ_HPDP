import { useNavigate, useSearchParams } from "react-router-dom";
import DeepBlueBtn from "../../components/common/DeepBlueBtn";
export function FailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/profile");
  };
  return (
    <div>
      <h1>결제 실패</h1>
      <div
        style={{
          marginTop: "35vh",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div>{`사유: ${searchParams.get("message")}`}</div>
        <DeepBlueBtn
          text="돌아가기"
          styles={{ width: "80%", height: "3rem" }}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
