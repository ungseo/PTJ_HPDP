import AnimationLabelInput from "../common/Inputs";
import DefaultButton from "../common/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/css/LoginForm.module.css";
import { useState } from "react";
import { login } from "../../api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { Switch } from "@mui/material";
import { getMemberInfo } from "../../api/members";
import DuplicationBtn from "./DuplicationBtn";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (event: any) => {
    event.preventDefault();
    const type = !checked ? 0 : 1;
    const data = {
      loginId: id,
      loginPw: pw,
    };
    console.log(data);
    login(
      type,
      data,
      (res) => {
        const headers: any = res.headers;
        const tokens = {
          accessToken: headers.get("accessToken"),
          refreshToken: headers.get("refreshToken"),
        };
        dispatch(userActions.loginHandler(tokens));
        navigate("/");
        window.location.reload();
      },
      (err) => {
        alert(err.message);
      }
    );
  };
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checked, setChecked] = useState(false);
  const toggler = () => {
    setChecked(!checked);
  };
  const onChange = (event: any) => {
    const { id, value } = event.target;
    if (id === "id") {
      setId(value);
    } else if (id === "pw") {
      setPw(value);
    }
  };
  return (
    <form className={style.form} onSubmit={loginHandler}>
      <div className={style.toggler}>
        <p>기업회원 이신가요?</p>
        <Switch checked={checked} onChange={toggler} />
      </div>
      <AnimationLabelInput
        labelTitle={"Id"}
        type="text"
        styles={{ height: "4rem" }}
        id="id"
        value={id}
        onChange={onChange}
      />
      <AnimationLabelInput
        labelTitle={"Password"}
        type="password"
        styles={{ height: "4rem" }}
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
