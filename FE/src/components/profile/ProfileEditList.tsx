import AnimationLabelInput from "../common/Inputs";

const ProfileEditList = () => {
  return (
    <div>
      <AnimationLabelInput labelTitle="Id" type="text" />
      <AnimationLabelInput labelTitle="Name" type="text" />
      <AnimationLabelInput labelTitle="Email" type="text" />
      <AnimationLabelInput labelTitle="Phone Number" type="text" />
    </div>
  );
};

export default ProfileEditList;
