import AnimationLabelInput from "../common/Inputs";
import DefaultButton from "../common/Buttons";
import { Link } from "react-router-dom";
import style from "../../styles/css/LoginForm.module.css";
import { useState } from "react";
import { login } from "../../api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { Switch } from "@mui/material";
const LoginForm = () => {
  const dispatch = useDispatch();
  const loginHandler = (event: any) => {
    event.preventDefault();
    const data = {
      type: checked ? 0 : 1,
      loginId: id,
      loginPw: pw,
    };
    dispatch(userActions.loginHandler(data));
  };
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checked, setChecked] = useState(false);
  const toggler = () => {
    setChecked(true);
  };
  const onChange = (event: any) => {
    const { id } = event.target;
    if (id === "id") {
      setId(event.target.value);
    } else if (id === "pw") {
      setPw(event.target.value);
    }
  };
  return (
    <form className={style.form} onSubmit={loginHandler}>
      <Switch checked={checked} onChange={toggler} />
      <AnimationLabelInput
        labelTitle={"Id"}
        type="text"
        styles={{ height: "4em" }}
        id="id"
        value={id}
        onChange={onChange}
      />
      <AnimationLabelInput
        labelTitle={"Password"}
        type="password"
        styles={{ height: "4em" }}
        id="pw"
        value={pw}
        onChange={onChange}
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
