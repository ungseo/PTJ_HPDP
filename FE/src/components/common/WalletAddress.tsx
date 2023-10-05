import React from "react";
import style from "../../styles/css/WalletAddress.module.css";

interface WalletAddressProps {
  memberBlockChainInfo: string;
}

const WalletAddress = ({ memberBlockChainInfo }: WalletAddressProps) => {
  return (
    <div className={style.wallet_content}>
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          marginBottom: "0.2rem",
        }}
      >
        지갑 주소
      </div>
      <div>{memberBlockChainInfo}</div>
    </div>
  );
};

export default WalletAddress;
