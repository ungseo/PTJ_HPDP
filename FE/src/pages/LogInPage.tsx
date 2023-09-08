import style from "../styles/css/LoginPage.module.css";

const LogInPage = () => {
  const loginHandler = () => {
    alert("Login 핸들러");
  };
  return (
    <div id="loginPage">
      <div className={style.topbar}>
        <h1>한푼두푼</h1>
      </div>
      <h1>로그인</h1>
      <input type="text" placeholder="ID" />
      <input type="text" placeholder="PW" />

      <a href="#">ID/PW를 잊어버리셨나요??</a>
      <button id={style.loginbtn} onClick={loginHandler}>
        로그인
      </button>
    </div>
  );
};

export default LogInPage;
