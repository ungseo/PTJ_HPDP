import { LogoTopbar, OptionTopbar } from "../components/common/TopBar";
import SignUpForm from "../components/signup/SignUpForm";
import style from "../styles/css/SignUpPage.module.css";
const SignUpPage = () => {
  return (
    <div>
      <LogoTopbar />
      <div className={style.wrapper}>
        <h1 className={style.header}>회원가입</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
