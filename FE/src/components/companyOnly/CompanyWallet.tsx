import { Icon } from "@iconify/react";
import style from "../../styles/css/CompanyWallet.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CompanyWallet = () => {
  const point = useSelector((state: any) => state.company.info.point);
  return (
    <div className={style.wrapper}>
      <p className={style.title}>포인트</p>
      <p className={style.point}>{formatNumber(point)} P</p>
    </div>
  );
};

export default CompanyWallet;
