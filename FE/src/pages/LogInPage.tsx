import { LogoTopbar } from "../components/common/TopBar";
import style from "../styles/css/LoginPage.module.css";
import LoginForm from "../components/login/LoginForm";
import AscendingNumber from "../components/common/AscendingNumber";
const LogInPage = () => {
  return (
    <div className="loginPage">
      <LogoTopbar />
      <div className={style.wrapper}>
        <h1 className={style.header}>로그인</h1>
        <LoginForm />
      </div>
      <AscendingNumber num={550112313424624626} />
    </div>
  );
};

export default LogInPage;
