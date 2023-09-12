import AnimationLabelInput from "../common/Inputs";
import DefaultButton from "../common/Buttons";
import { Link } from "react-router-dom";
import style from "../../styles/css/LoginForm.module.css";
const LoginForm = ({ onSubmit }: any) => {
  const loginHandler = (event: any) => {
    event.preventDefault();
    alert("Login 핸들러");
  };
  return (
    <form className={style.form} onSubmit={loginHandler}>
      <AnimationLabelInput
        labelTitle={"Id"}
        type="text"
        styles={{ height: "4em" }}
      />
      <AnimationLabelInput
        labelTitle={"Password"}
        type="password"
        styles={{ height: "4em" }}
      />
      <a href="#">Id/Password를 잊어버리셨나요?</a>
      <DefaultButton
        text="로그인"
        styles={{ width: "80%", height: "2rem" }}
        type="submit"
      />
      <Link className={style.Link} to={"/signup"}>
        회원이 아니신가요?
      </Link>
    </form>
  );
};

export default LoginForm;
