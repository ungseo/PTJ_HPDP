import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/css/DetailPageTop.module.css";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import {
  registerInterestingCompany,
  unregisterInterestingCompany,
} from "../api/interests";

interface DetailTopProps {
  data: {
    companyId: number;
    interested?: boolean;
    name: string;
    profileImg?: string;
    thumbnail?: string | null;
    title?: string;
  };
}

const DetailPageTop = (props: DetailTopProps) => {
  const { data } = props;
  console.log("라라", data);

  const companyId = data.companyId;

  const navigate = useNavigate();

  const handleGoList = () => {
    navigate("/list");
  };
  const handleGoCompany = () => {
    if (companyId) {
      navigate(`/company/detail/${companyId}`);
    }
  };

  const totalStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${data.thumbnail})`,
  };

  // 관심 기업 등록(삭제)
  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  const [isLiked, setIsLiked] = useState(data.interested);

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const toggleLike = () => {
    console.log("기업 번호:", companyId, "관심 여부:", isLiked);

    if (isLiked) {
      unregisterInterestingCompany(
        accessToken,
        companyId,
        (res) => {
          setIsLiked(!isLiked);
          console.log("관심 기업 삭제", res);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      registerInterestingCompany(
        accessToken,
        companyId,
        (res) => {
          setIsLiked(!isLiked);
          console.log("관심 기업 등록", res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return (
    <div className={style.total} style={totalStyle}>
      {isLogined ? (
        <IconButton
          aria-label={`like ${data.name}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleLike();
          }}
          className={style.iconButton}
          style={{
            color: isLiked ? "red" : "lightgray",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      ) : null}

      <Icon
        icon="bi:chevron-left"
        className={style.icon}
        width="2rem"
        onClick={handleGoList}
      />
      <div className={style.topcontent}>
        <div className={style.downsection}>
          {data.title && <div className={style.fundingtitle}>{data.title}</div>}
        </div>
        <div className={style.upsection}>
          <img
            src={data.profileImg}
            alt="Company Logo"
            className={style.upimg}
          />
          <div className={style.companyname} onClick={handleGoCompany}>
            {data.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageTop;
