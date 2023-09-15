import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import style from "../../styles/css/BottomSheet.module.css";

interface BottomSheetProps {
  setIsBottomSheetOpen: (value: boolean) => void;
  handleDonationAmount: (value: number) => void;
}

const BottomSheet = ({
  setIsBottomSheetOpen,
  handleDonationAmount,
}: BottomSheetProps) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(() => {
      setIsBottomSheetOpen(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value);
    handleDonationAmount(Number(e.target.value));
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <div
      className={`${style.bottomsheetcontainer} ${
        isActive ? style.active : ""
      }`}
    >
      <div className={style.closeicon}>
        <Icon icon="bi:x-circle" onClick={handleClose} />
      </div>
      <div className={style.bottomsheetcontent}>
        <div>
          깨끗한 바다를 꿈꾸는 제주 하르방 키링 펀딩에 참여하시겠습니까?
        </div>
        <div>
          <div>후원 금액</div>
          <input
            type="text"
            placeholder="후원할 금액"
            value={donationAmount}
            onChange={handleInputChange}
          />
          <div>사용 가능 포인트</div>
        </div>
        <div>5만원 이상 후원시 리워드가 지급됩니다</div>
      </div>
      <div style={{ height: "6rem" }}></div>
    </div>
  );
};

export default BottomSheet;
