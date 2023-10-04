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

  // 상속 정보
  const data = {
    companyId: companyItem.companyId,
    interested: companyItem.interested,
    name: companyItem.name,
    profileImg: companyItem.profile,
    thumbnail: companyItem.banner,
  };

  return (
    <div className={style.companydetailpage}>
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
