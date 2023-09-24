import React from "react";
import { useNavigate } from "react-router-dom";
import { OutFundingsInfoInterface } from "../interface/apiDataInterface";
import style from "../styles/css/DetailPageTop.module.css";
import { Icon } from "@iconify/react";

// const DetailPageTop = ({ props }: { props: OutFundingsInfoInterface }) => {
const DetailPageTop = () => {
  const navigate = useNavigate();

  const handleGoList = () => {
    navigate("/list");
  };
  //   const totalStyle = {
  //     backgroundImage: `url(${props.thumbnail})`,
  //   };

  return (
    // <div className={style.total} style={totalStyle}>
    <div className={style.total}>
      <Icon
        icon="bi:chevron-left"
        className={style.icon}
        width="2rem"
        onClick={handleGoList}
      />
      <div className={style.topcontent}>
        <div className={style.upsection}>
          <img src="/hpdpLogo.png" alt="Company Logo" className={style.upimg} />
          {/* <div className={style.companyname}>{props.name}</div> */}
          <div className={style.companyname}>name</div>
        </div>
        <div className={style.downsection}>
          {/* <div className={style.fundingtitle}>{props.title}</div> */}
          <div className={style.fundingtitle}>title</div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageTop;
