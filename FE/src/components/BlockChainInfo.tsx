import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Interfaces from "../interface/apiDataInterface";
import { getBlockchainInfo } from "../api/blockchain";
import { Grid } from "@mui/material";
import style from "../styles/css/BlockChainInfo.module.css";
import DefaultButton from "../components/common/DefaultButton";

interface BlockChainInfoProps {
  onClose: () => void; // 이 함수를 호출하여 모달을 닫습니다.
  historyId: number;
  point: number;
  date: string;
}

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BlockChainInfo = ({
  onClose,
  historyId,
  point,
  date,
}: BlockChainInfoProps) => {
  const [blockChainData, setBlockChainData] =
    useState<Interfaces.BlockChainInfo>({} as Interfaces.BlockChainInfo);
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [isActive, setIsActive] = useState(false);
  const formatpoint = formatNumber(point);
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

  useEffect(() => {
    getBlockchainInfo(
      accessToken,
      historyId,
      (res) => {
        setBlockChainData(res.data.data);
        console.log("블록체인 API 연결");
      },
      (err) => {
        console.log("블록체인 호출 실패", err);
      }
    );
  }, []);
  console.log(blockChainData);
  console.log(date);
  return (
    <div
      className={`${style.bottomsheetcontainer} ${
        isActive ? style.active : ""
      }`}
      style={{ zIndex: 5 }}
    >
      <div className={style.blockchain_content}>
        <div
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            marginTop: "1rem",
            marginBottom: "1.2rem",
          }}
        >
          블록체인 기록 정보
        </div>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            TRANSACTION HASH
          </Grid>
          <Grid item xs={8}>
            {blockChainData.transactionHash}
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            TIME STAMP
          </Grid>
          <Grid item xs={8}>
            {date}
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            BLOCK NUMBER
          </Grid>
          <Grid item xs={8}>
            {blockChainData.blockNumber}
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            FROM
          </Grid>
          <Grid item xs={8}>
            {blockChainData.trxFrom}
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            TO
          </Grid>
          <Grid item xs={8}>
            {blockChainData.trxTo}
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            VALUE
          </Grid>
          <Grid item xs={8}>
            {formatpoint} P
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            STATUS
          </Grid>
          <Grid item xs={8}>
            {blockChainData.status}
          </Grid>
        </Grid>
        <Grid container className={style.bottomsheetcontent}>
          <Grid item xs={4} className={style.title}>
            CUMULATIVE GASUSED
          </Grid>
          <Grid item xs={8}>
            {blockChainData.cumulativeGasUsed}
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
