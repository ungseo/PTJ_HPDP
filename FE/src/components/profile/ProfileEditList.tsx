import AnimationLabelInput from "../common/Inputs";

const ProfileEditList = () => {
  return (
    <div style={{ padding: "1.5rem" }}>
      <AnimationLabelInput labelTitle="Id" type="text" />
      <AnimationLabelInput labelTitle="Name" type="text" />
      <AnimationLabelInput labelTitle="Email" type="text" />
      <AnimationLabelInput labelTitle="Phone Number" type="text" />
    </div>
  );
};

export default ProfileEditList;
