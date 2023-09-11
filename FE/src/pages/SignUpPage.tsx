import { LogoTopbar, OptionTopbar } from "../components/common/TopBar";
import SignUpForm from "../components/signup/SignUpForm";
import style from "../styles/css/SignUpPage.module.css";
const SignUpPage = () => {
  const onSubmit = (event: any) => {
    event.preventDefault();
    alert("회원가입 핸들러");
  };
  return (
    <div>
      <LogoTopbar />
      <div className={style.wrapper}>
        <h1 className={style.header}>회원가입</h1>
        <SignUpForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default SignUpPage;
