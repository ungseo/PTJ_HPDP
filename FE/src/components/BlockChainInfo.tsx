import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import style from "../styles/css/BlockChainInfo.module.css";
import DefaultButton from "../components/common/DefaultButton";
interface BlockChainInfoProps {
  onClose: () => void; // 이 함수를 호출하여 모달을 닫습니다.
}

const BlockChainInfo = ({ onClose }: BlockChainInfoProps) => {
  const [isActive, setIsActive] = useState(false);
  const handleConfirmClick = () => {
    // 확인 버튼 클릭 시 onClose 함수를 호출하여 모달을 닫습니다.

    setIsActive(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    setIsActive(true);
  }, []);
  return (
    <div
      className={`${style.bottomsheetcontainer} ${
        isActive ? style.active : ""
      }`}
      style={{ zIndex: 5 }}
    >
      <div>
        <h3>블록체인 기록 정보</h3>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            TRANSACTION HASH
          </Grid>
          <Grid item xs={8}>
            0x9987e19be60d115e3c17e9a74d6cc077c2f1b424689ce328608d83b7d2c3d537
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            TIMESTAMP
          </Grid>
          <Grid item xs={8}>
            2023.08.31 07:09:55 AM +UTC
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            FROM
          </Grid>
          <Grid item xs={8}>
            0x945993cdf095d7844eca3c
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            TO
          </Grid>
          <Grid item xs={8}>
            0x945993cdf095d7844eca3c
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            VALUE
          </Grid>
          <Grid item xs={8}>
            12,000 P
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            STATUS
          </Grid>
          <Grid item xs={8}>
            SUCCEED
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            BLOCK HEIGHT
          </Grid>
          <Grid item xs={8}>
            121,945,841
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            BLOCK CONFIRMATION
          </Grid>
          <Grid item xs={8}>
            335,568
          </Grid>
        </Grid>
        <DefaultButton
          text="확인"
          styles={{ width: "40%", height: "2rem" }}
          type="submit"
          onClick={handleConfirmClick}
        />
      </div>
      <div style={{ height: "4rem" }}></div>
    </div>
  );
};

export default BlockChainInfo;
