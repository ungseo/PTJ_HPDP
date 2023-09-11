import { OptionTopbar } from "../components/common/TopBar";
import DefaultButton from "../components/common/Buttons";
import AnimationLabelInput from "../components/common/Inputs";
import style from "../styles/css/SignUpPage.module.css";
const SignUpPage = () => {
  return (
    <div>
      <OptionTopbar text="뒤로가기" />
      <div className={style.wrapper}>
        <h1 className={style.htag}>회원가입</h1>
        <input className={style.inputbox} type="text" placeholder="id" />
        <input className={style.inputbox} type="text" placeholder="name" />
        <input className={style.inputbox} type="text" placeholder="password" />
        <input className={style.inputbox} type="text" placeholder="pssword2" />
        <input className={style.inputbox} type="text" placeholder="email" />
        <input
          className={style.inputbox}
          type="text"
          placeholder="phone number"
        />
        <AnimationLabelInput labelTitle={"Email"} />
        <DefaultButton
          text={"회원가입"}
          styles={{ width: "80%", height: "70%" }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
