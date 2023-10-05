import React from "react";
import style from "../../styles/css/RewardModal.module.css";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface RewardModalProps {
  rewardPrice: number;
  myTotalFunding: number;
}

const RewardModal = ({ rewardPrice, myTotalFunding }: RewardModalProps) => {
  const remain = rewardPrice - myTotalFunding;

  let content;

  if (myTotalFunding === 0) {
    content = (
      <div>
        해당 후원에 참여한<div> 기록이 없습니다.</div>
      </div>
    );
  } else if (remain > 0) {
    content = (
      <div>
        <div>
          리워드 획득까지{" "}
          <span style={{ fontWeight: "600", fontSize: "1.2rem" }}>
            {formatNumber(remain)}
          </span>
          P
        </div>
      </div>
    );
  } else {
    content = (
      <div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.3rem",
          }}
        >
          리워드 획득!
        </div>{" "}
        <div>
          지금까지{" "}
          <span style={{ fontWeight: "600" }}>
            {formatNumber(myTotalFunding)}
          </span>
          P를 후원했습니다.
        </div>
      </div>
    );
  }

  return <div className={style.reward_modal}>{content}</div>;
};

export default RewardModal;
