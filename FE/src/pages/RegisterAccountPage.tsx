import SelectBox from "../components/SelectBox";
import DeepBlueBtn from "../components/common/DeepBlueBtn";
import style from "../styles/css/RegisterAccountPage.module.css";
const RegisterAccountPage = () => {
  const items = [
    ["002", "KDB산업은행"],
    ["003", "IBK기업은행"],
    ["004", "KB국민은행"],
    ["011", "NH농협은행"],
    ["020", "우리은행"],
    ["023", "SC은행"],
    ["031", "대구은행"],
    ["032", "부산은행"],
    ["034", "광주은행"],
    ["035", "제주은행"],
    ["037", "전북은행"],
    ["039", "경남은행"],
    ["045", "MG새마을금고"],
    ["048", "신협중앙회"],
    ["071", "우체국"],
    ["081", "KEB하나은행"],
    ["088", "신한은행"],
  ];
  return (
    <div className={style.wrapper}>
      <h1>계좌 등록</h1>
      <SelectBox items={items} />
      <input type="text" placeholder="계좌번호" />
      <input type="password" placeholder="비밀번호" />
      <DeepBlueBtn text="계좌등록" />
    </div>
  );
};

export default RegisterAccountPage;
