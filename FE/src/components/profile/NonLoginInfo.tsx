import { Link } from "react-router-dom";
const NonLoginInfo = () => {
  return (
    <div>
      <Link
        style={{ fontSize: "1.5rem", textDecoration: "none" }}
        to={"/login"}
      >
        로그인 및 회원가입 하기
      </Link>
      <br />
      <span>로그인 후 다양한 후원에 참여하세요</span>
    </div>
  );
};

export default NonLoginInfo;
