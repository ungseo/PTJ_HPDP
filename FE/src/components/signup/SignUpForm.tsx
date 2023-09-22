import { useState } from "react";
import DefaultButton from "../common/DefaultButton";
import AnimationLabelInput from "../common/Inputs";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import DuplicationBtn from "../login/DuplicationBtn";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState({
    loginId: "",
    loginPw: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [pw2, setPw2] = useState("");
  const onChange = (event: any) => {
    const { id, value } = event.target;
    if (id === "loginPw2") {
      setPw2(value);
    } else {
      setSignupInput((prev) => ({ ...prev, [id]: value }));
    }
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    const data = signupInput;
    signup(
      data,
      (res) => {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <form onSubmit={onSubmit}>
      <div style={{ width: "100%", position: "relative" }}>
        <AnimationLabelInput
          id="loginId"
          labelTitle={"Id"}
          type="text"
          styles={{ height: "4rem" }}
          value={signupInput.loginId}
          onChange={onChange}
        />
        <DuplicationBtn checkingId={signupInput.loginId} />
      </div>

      <AnimationLabelInput
        id="loginPw"
        labelTitle={"Password"}
        type="password"
        styles={{ height: "4rem" }}
        value={signupInput.loginPw}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="loginPw2"
        labelTitle={"Password Confirmation"}
        type="password"
        styles={{ height: "4rem" }}
        value={pw2}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="name"
        labelTitle={"Name"}
        type="text"
        styles={{ height: "4rem" }}
        value={signupInput.name}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="email"
        labelTitle={"Email"}
        type="text"
        styles={{ height: "4rem" }}
        value={signupInput.email}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="phoneNumber"
        labelTitle={"Phone Number"}
        type="text"
        styles={{ height: "75px" }}
        value={signupInput.phoneNumber}
        onChange={onChange}
      />
      <DefaultButton
        text={"회원가입"}
        styles={{ width: "80%", height: "2rem" }}
      />
    </form>
  );
};

export default SignUpForm;
