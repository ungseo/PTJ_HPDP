import React from "react";
import { useNavigate } from "react-router-dom";

import style from "../styles/css/DetailPageTop.module.css";
import { Icon } from "@iconify/react";

interface DetailTopProps {
  data: {
    name: string;
    title?: string;
    thumbnail?: string;
    profile?: string;
    companyId?: number;
    profileImg?: string;
  };
}

const DetailPageTop = (props: DetailTopProps) => {
  const { data } = props;
  const navigate = useNavigate();

  const handleGoList = () => {
    navigate("/list");
  };
  const handleGoCompany = () => {
    const { companyId } = data;
    if (companyId) {
      navigate(`/company/detail/${companyId}`);
    }
  };
  const totalStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${data.thumbnail})`,
  };

  return (
    <div className={style.total} style={totalStyle}>
      <Icon
        icon="bi:chevron-left"
        className={style.icon}
        width="2rem"
        onClick={handleGoList}
      />
      <div className={style.topcontent}>
        <div className={style.upsection}>
          <img src={data.profile} alt="Company Logo" className={style.upimg} />
          <div className={style.companyname} onClick={handleGoCompany}>
            {data.name}
          </div>
        </div>
        <div className={style.downsection}>
          {data.title && <div className={style.fundingtitle}>{data.title}</div>}
        </div>
      </div>
    </div>
  );
};

export default DetailPageTop;
