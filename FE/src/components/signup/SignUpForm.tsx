import DefaultButton from "../common/DefaultButton";
import AnimationLabelInput from "../common/Inputs";

const SignUpForm = ({ onSubmit }: any) => {
  return (
    <form onSubmit={onSubmit}>
      <AnimationLabelInput
        labelTitle={"Id"}
        type="text"
        styles={{ height: "4em" }}
      />
      <AnimationLabelInput
        labelTitle={"Name"}
        type="text"
        styles={{ height: "4em" }}
      />
      <AnimationLabelInput
        labelTitle={"Password"}
        type="password"
        styles={{ height: "4em" }}
      />
      <AnimationLabelInput
        labelTitle={"Password Confirmation"}
        type="password"
        styles={{ height: "4em" }}
      />
      <AnimationLabelInput
        labelTitle={"Email"}
        type="text"
        styles={{ height: "4em" }}
      />
      <AnimationLabelInput
        labelTitle={"Phone Number"}
        type="text"
        styles={{ height: "75px" }}
      />
      <DefaultButton
        text={"회원가입"}
        styles={{ width: "80%", height: "2rem" }}
      />
    </form>
  );
};

export default SignUpForm;
