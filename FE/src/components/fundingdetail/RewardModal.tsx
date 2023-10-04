import React from "react";
import style from "../../styles/css/RewardModal.module.css";

interface RewardModalProps {
  rewardPrice: number;
  myTotalFunding: number;
}

const RewardModal = ({ rewardPrice, myTotalFunding }: RewardModalProps) => {
  return (
    <div className={style.reward_modal}>
      <div>{rewardPrice}</div>
      <div>{myTotalFunding}</div>
    </div>
  );
};

export default RewardModal;
