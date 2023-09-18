import { useState } from "react";
import DefaultButton from "../components/common/DefaultButton";
import { OptionTopbar } from "../components/common/TopBar";
import { CheckoutPage } from "./Toss/CheckoutPage";
const InterestCompaniesPage = () => {
  const [openPayment, setOpenPayment] = useState(false);
  const onClick = () => {
    setOpenPayment(true);
  };
  return (
    <div>
      <OptionTopbar text="관심기업목록" />
      <DefaultButton text="결제하기" onClick={onClick} />
      {openPayment && <CheckoutPage />}
    </div>
  );
};

export default InterestCompaniesPage;
