import React, { useState } from 'react'
import DeepBlueBtn from "../components/common/DeepBlueBtn";
import style from "../styles/css/RegisterAccountPage.module.css";

import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { registerAccount } from '../api/banks';
import { useNavigate } from 'react-router-dom';

const RegisterAccountPage = () => {
  const navigate = useNavigate();

  // 정보 저장
  const [accountNumber, setAccountNumber] = useState("");
  const [accountPw, setAccountPw] = useState("");
  const [bankCode, setBankCode] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setBankCode(event.target.value as string);
  };

  // 계좌 등록
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const handleButtonClick = () => {
    registerAccount(
      accessToken,
      accountNumber,
      accountPw,
      bankCode,
      (res) => {
        console.log("계좌 등록 성공:", res);
        navigate('/profile');
      },
      (err) => {
        console.error("계좌 등록 실패:", err);
      }
    );
  };

  return (
    <div className={style.wrapper}>
      <h1>계좌 등록</h1>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={bankCode}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <input
        type="text"
        placeholder="계좌 번호"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={accountPw}
        onChange={(e) => setAccountPw(e.target.value)}
      />
      <DeepBlueBtn text="계좌 등록" onClick={handleButtonClick} />
    </div>
  )
}

export default RegisterAccountPage

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