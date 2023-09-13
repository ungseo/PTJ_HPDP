import React, { useState } from "react";
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

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value);
    handleDonationAmount(Number(e.target.value));
  };

  return (
    <div className={style.bottomsheetcontainer}>
      <div style={{ margin: "2rem" }}>
        후원 모달
        <Icon icon="bi:x-circle" onClick={handleClose} />
        <div>
          <input
            type="text"
            placeholder="후원할 금액"
            value={donationAmount}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
