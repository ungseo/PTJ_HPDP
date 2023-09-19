import { useState } from "react";
import DefaultButton from "../common/DefaultButton";
import AnimationLabelInput from "../common/Inputs";
import { signup } from "../../api/auth";

const SignUpForm = () => {
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
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <form onSubmit={onSubmit}>
      <AnimationLabelInput
        id="loginId"
        labelTitle={"Id"}
        type="text"
        styles={{ height: "4em" }}
        value={signupInput.loginId}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="loginPw"
        labelTitle={"Password"}
        type="password"
        styles={{ height: "4em" }}
        value={signupInput.loginPw}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="loginPw2"
        labelTitle={"Password Confirmation"}
        type="password"
        styles={{ height: "4em" }}
        value={pw2}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="name"
        labelTitle={"Name"}
        type="text"
        styles={{ height: "4em" }}
        value={signupInput.name}
        onChange={onChange}
      />
      <AnimationLabelInput
        id="email"
        labelTitle={"Email"}
        type="text"
        styles={{ height: "4em" }}
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
