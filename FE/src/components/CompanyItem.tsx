import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Interfaces from "../interface/apiDataInterface";
import {
  registerInterestingCompany,
  unregisterInterestingCompany,
} from "../api/interests";
import style from "../styles/css/CompanyItem.module.css";

interface CompanyItemProps {
  item: Interfaces.InSearchCompanyInfoResponseInterface;
}

const CompanyItem = (props: CompanyItemProps) => {
  const { item } = props;

  const companyId = item.companyId;

  // 관심 기업 등록(삭제)
  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  const [isLiked, setIsLiked] = useState(item.interested);

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

  // 기업 상세 이동
  const navigate = useNavigate();

  const handleImageListItemClick = () => {
    navigate(`/company/detail/${item.companyId}`);
  };

  return (
    <div className={style.wrapper} onClick={handleImageListItemClick}>
      <div className={style.img} style={{}}>
        <img
          src={`${item.profile}?w=248&fit=crop&auto=format`}
          srcSet={`${item.profile}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.name}
          loading="lazy"
          style={{ width: "100%" }}
        />
      </div>
      {isLogined ? (
        <IconButton
          aria-label={`like ${item.name}`}
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

      {/* <ImageListItemBar title={item.name} position="below"> */}
      <p className={style.cpnName}>{item.name}</p>
      {/* </ImageListItemBar> */}
    </div>
  );
};

export default CompanyItem;
