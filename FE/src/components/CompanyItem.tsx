import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InSearchCompanyInfoResponseInterface } from "../interface/apiDataInterface"

const CompanyItem = ({item}: { item :InSearchCompanyInfoResponseInterface }) => {
  const [isLiked, setIsLiked] = useState(false);

  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  const toggleLike = () => {
    setIsLiked(!isLiked);

    // axios.post('')
    // .then((res)=>{
    //   console.log(res.data)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  };

  const navigate = useNavigate();

  const handleCompanyDetail = () => {
    navigate(`/company/detail/${item.companyId}`);
  };

  return (
    <div>
      <ImageListItem key={item.profile} onClick={handleCompanyDetail}>
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
