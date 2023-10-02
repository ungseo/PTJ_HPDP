import { useState } from "react";
import DefaultButton from "../common/DefaultButton";
import AnimationLabelInput from "../common/Inputs";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import DuplicationBtn from "../login/DuplicationBtn";
import { NotOkModal, OkModal } from "../common/AlertModals";
import LoadingSpinner from "../common/LoadingSpinner";

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
  const [dup, setDup] = useState("");

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (dup) {
      NotOkModal({ title: "실패", text: "아이디가 중복됐습니다" });
      return;
    } else if (signupInput.loginPw !== pw2) {
      NotOkModal({ title: "실패", text: "비밀번호를 확인해주세요" });
      return;
    } else {
      const data = signupInput;
      setWallet(true);
      signup(
        data,
        (res) => {
          OkModal({ title: "성공", text: "회원가입이 완료되었습니다!" });
          setWallet(false);
          navigate("/login");
        },
        (err) => {
          setWallet(false);
          NotOkModal({ title: "실패", text: err.response.message });
        }
      );
    }
  };
  const [wallet, setWallet] = useState<boolean>(false);
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
        <DuplicationBtn checkingId={signupInput.loginId} setDup={setDup} />
      </div>

      <AnimationLabelInput
        id="loginPw"
        labelTitle={"Password"}
        type="password"
        styles={{ height: "4rem" }}
        value={signupInput.loginPw}
        onChange={onChange}
      />
      <div style={{ position: "relative" }}>
        <p
          style={{
            margin: "0",
            color: "red",
            fontSize: "0.5rem",
            textAlign: "start",
            position: "absolute",
            bottom: "1.25rem",
          }}
        >
          특수문자, 대문자, 소문자를 포함하여 10자이상 입력해주세요.
        </p>
      </div>
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
      {wallet && <LoadingSpinner />}
    </form>
  );
};

export default SignUpForm;
