import { LogoTopbar } from "../components/common/TopBar";
import style from "../styles/css/LoginPage.module.css";
import LoginForm from "../components/login/LoginForm";
const LogInPage = () => {
  const loginHandler = () => {
    alert("Login 핸들러");
  };
  return (
    <div className="loginPage">
      <LogoTopbar />
      <div className={style.wrapper}>
        <h1 className={style.header}>로그인</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LogInPage;
