import DefaultButtons from "../components/common/Buttons";
import { LogoTopbar } from "../components/common/TopBar";
import style from "../styles/css/LoginPage.module.css";
const LogInPage = () => {
  const loginHandler = () => {
    alert("Login 핸들러");
  };
  return (
    <div className="loginPage">
      <LogoTopbar />
      <div className={style.wrapper}>
        <h1 className={style.htag}>로그인</h1>
        <input className={style.inputbox} type="text" placeholder="ID" />
        <input className={style.inputbox} type="text" placeholder="PW" />

        <a href="#">ID/PW를 잊어버리셨나요??</a>
        <DefaultButtons
          text="로그인"
          onClick={loginHandler}
          styles={{ width: "80%", height: "70%" }}
        />
      </div>
    </div>
  );
};

export default LogInPage;
