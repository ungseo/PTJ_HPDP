import { useState } from "react";
import DeepBlueBtn from "../components/common/DeepBlueBtn";
import style from "../styles/css/RegisterAccountPage.module.css";

import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { registerAccount } from "../api/banks";
import { useNavigate } from "react-router-dom";
import AnimationLabelInput from "../components/common/Inputs";
import { BackTopbar, OptionTopbar } from "../components/common/TopBar";
import SecurityPwInput from "../components/testbank/SecurityPwInput";
import { NotOkModal, OkModal } from "../components/common/AlertModals";

const RegisterAccountPage = () => {
  const navigate = useNavigate();

  // 정보 저장
  const [accountNumber, setAccountNumber] = useState("");
  const [accountPw, setAccountPw] = useState("");
  const [bankCode, setBankCode] = useState("");
  console.log(accountPw);
  const handleChange = (event: SelectChangeEvent) => {
    setBankCode(event.target.value as string);
  };

  // 계좌 등록
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const handleButtonClick = () => {
    if (accountPw.length === 4 && accountNumber && bankCode) {
      registerAccount(
        accessToken,
        accountNumber,
        accountPw,
        bankCode,
        (res) => {
          OkModal({ title: "성공", text: "계좌 등록에 성공했습니다." }).then(
            (res) => navigate("/profile")
          );
        },
        (err) => {
          NotOkModal({ title: "실패", text: "계좌 등록에 실패했습니다." });
        }
      );
    } else {
      NotOkModal({ title: "실패", text: "계좌정보를 정확히 입력해주세요." });
    }
  };
  const [isInput, setIsInput] = useState(false);
  const pwInputHandler = () => {
    setIsInput(true);
  };
  return (
    <div>
      <OptionTopbar text="계좌등록" />
      <div className={style.wrapper}>
        {/* <h1>계좌 등록</h1> */}
        <p>
          한푼두푼의 서비스 이용을 위해
          <br />
          본인의 계좌를 등록해주세요.
        </p>
        <div className={style.bank}>
          <label className={style.label} htmlFor="">
            은행 선택
          </label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bankCode}
            placeholder="은행"
            onChange={handleChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <AnimationLabelInput
          type="text"
          labelTitle="계좌 번호"
          value={accountNumber}
          onChange={(e: any) => setAccountNumber(e.target.value)}
        />
        <div
          onClick={pwInputHandler}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "2rem",
          }}
        >
          <button>비밀번호입력</button>
          <input
            type="password"
            value={accountPw}
            disabled={true}
            onChange={(e: any) => setAccountPw(String(e.target.value))}
          />
        </div>
        {isInput && (
          <SecurityPwInput
            setIsInput={setIsInput}
            setAccountPw={setAccountPw}
          />
        )}
        <DeepBlueBtn
          text="계좌 등록"
          onClick={handleButtonClick}
          styles={{ width: "90%", height: "2.5rem", marginTop: "1.5rem" }}
        />
      </div>
    </div>
  );
};

export default RegisterAccountPage;

const options = [
  { value: "KDB", label: "KDB산업은행" },
  { value: "IBK", label: "IBK기업은행" },
  { value: "KB", label: "KB국민은행" },
  { value: "NH", label: "NH농협은행" },
  { value: "WR", label: "우리은행" },
  { value: "SC", label: "SC은행" },
  { value: "DG", label: "대구은행" },
  { value: "BS", label: "부산은행" },
  { value: "GJ", label: "광주은행" },
  { value: "JJ", label: "제주은행" },
  { value: "JB", label: "전북은행" },
  { value: "KN", label: "경남은행" },
  { value: "MG", label: "MG새마을금고" },
  { value: "SHJ", label: "신협중앙회" },
  { value: "PO", label: "우체국" },
  { value: "KEB", label: "KEB하나은행" },
  { value: "SH", label: "신한은행" },
];
