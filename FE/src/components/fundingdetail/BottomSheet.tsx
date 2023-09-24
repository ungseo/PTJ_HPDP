import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import style from "../../styles/css/BottomSheet.module.css";

interface BottomSheetProps {
  // 값이 변경될수 있으므로 아래와 같은 형식을 사용,
  // void는 반환하는 값이 없고 형식을 지키기 위해 사용
  setIsBottomSheetOpen: (value: boolean) => void;
  handleDonationAmount: (value: number) => void;
}

const BottomSheet = ({
  setIsBottomSheetOpen,
  handleDonationAmount,
}: BottomSheetProps) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [isActive, setIsActive] = useState(false);

  // bottomsheet를 닫을 수 있게 함
  const handleClose = () => {
    setIsActive(false);
    // 서서히 꺼지게 하는 모션을 위한 딜레이
    // 없으면 바로 사라짐
    setTimeout(() => {
      setIsBottomSheetOpen(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value);
    handleDonationAmount(Number(e.target.value));
  };

  // 처음부터 true일 경우 모션을 넣을 수 없음
  // useEffect로 값을 변경
  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    // {스타일을 동적으로 할당, isActive=true일 경우 올라오는 애니메이션 사용}
    <div
      className={`${style.bottomsheetcontainer} ${
        isActive ? style.active : ""
      }`}
      style={{ zIndex: 5 }}
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
