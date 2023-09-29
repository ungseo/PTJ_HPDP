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

interface CompanyItemProps {
  item: Interfaces.InSearchCompanyInfoResponseInterface;
}

const CompanyItem = (props: CompanyItemProps) => {
  const { item } = props;

  const companyId = item.companyId;

  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  // 관심 기업 등록(삭제)
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
    <div>
      <ImageListItem key={item.profile} onClick={handleImageListItemClick}>
        <img
          src={`${item.profile}?w=248&fit=crop&auto=format`}
          srcSet={`${item.profile}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.name}
          loading="lazy"
        />

        {isLogined ? (
          <IconButton
            aria-label={`like ${item.name}`}
            onClick={(event) => {
              event.stopPropagation();
              toggleLike();
            }}
            color={isLiked ? "error" : "default"}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <FavoriteIcon />
          </IconButton>
        ) : null}

        <ImageListItemBar title={item.name} position="below" />
      </ImageListItem>
    </div>
  );
};

export default CompanyItem;
