import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomizedTabs from "../components/CustomizedTabs";
import { useParams } from "react-router-dom";
import CompanyIntroduce from "../components/CompanyIntroduce";
import CompanySituation from "../components/CompanySituation";
import DetailPageTop from "../components/DetailPageTop";
import SendMessageModal from "../components/message/SendMessageModal";
import { Icon } from "@iconify/react";
import * as Interfaces from "../interface/apiDataInterface";
import { getCompanyItem } from "../api/companies";
import style from "../styles/css/CompanyDetailPage.module.css";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  registerInterestingCompany,
  unregisterInterestingCompany,
} from "../api/interests";

const CompanyDetailPage = () => {
  // 상세 조회
  const { companyid } = useParams();

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  const [companyItem, setCompanyItem] =
    useState<Interfaces.InSearchCompanyInfoResponseInterface>(
      {} as Interfaces.InSearchCompanyInfoResponseInterface
    );
  console.log("허억", companyItem);

  useEffect(() => {
    getCompanyItem(
      accessToken,
      Number(companyid),
      (res) => {
        setCompanyItem(res.data.data);
        console.log("기업 상세 API연결");
      },
      (err) => {
        console.error("기업 상세 API 호출 실패:", err);
      }
    );
  }, []);

  const tabProps = {
    소개: <CompanyIntroduce item={companyItem} />,
    후원: <CompanySituation item={companyItem} />,
  };

  // 모달 변화
  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  const [modalStatus, setModalStatus] = useState(false);

  const changeModal = () => {
    setModalStatus(!modalStatus);
  };

  // 관심 기업 등록(삭제)
  const companyId = companyItem.companyId;
  const interested = companyItem.interested;
  console.log("메롱", interested);

  const [isLiked, setIsLiked] = useState(interested);
  console.log("디릿", isLiked);

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

  // 상속 정보
  const data = {
    companyId: companyItem.companyId,
    name: companyItem.name,
    profileImg: companyItem.profile,
    thumbnail: companyItem.banner,
  };

  return (
    <div className={style.companydetailpage}>
      {isLogined ? (
        <IconButton
          aria-label={`like ${data.name}`}
          onClick={(event) => {
            // event.stopPropagation();
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

      <DetailPageTop data={data} />

      <CustomizedTabs tabProps={tabProps} />

      {isLogined ? (
        <div className={style.message_icon} onClick={changeModal}>
          <Icon
            icon="bi:chat-square-dots"
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            className={style.Icon_icon}
          ></Icon>
        </div>
      ) : null}

      {modalStatus && (
        <>
          <div className={style.modalbackground}></div>
          <SendMessageModal onClose={changeModal} data={data} />
        </>
      )}
    </div>
  );
};

export default CompanyDetailPage;
