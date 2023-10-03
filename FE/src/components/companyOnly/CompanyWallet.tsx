import { Icon } from "@iconify/react";
import style from "../../styles/css/CompanyWallet.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CompanyWallet = () => {
  const point = useSelector((state: any) => state.company.info.point);
  return (
    <div className={style.wrapper}>
      <p className={style.title}>포인트</p>
      <p className={style.point}>{point} P</p>
    </div>
  );
};

export default CompanyWallet;
