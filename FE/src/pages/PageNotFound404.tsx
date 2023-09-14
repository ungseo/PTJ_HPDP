import { useNavigate } from "react-router";
import DefaultButton from "../components/common/Buttons";
const PageNotFound404 = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>404: 페이지를 찾을 수 없습니다!</h1>
      <img src="/pageNotFound.png" alt="페이지를 찾을 수 없습니다." />
      <div>
        <DefaultButton
          text="뒤로가기"
          styles={{ width: "80%", height: "3vh" }}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default PageNotFound404;
