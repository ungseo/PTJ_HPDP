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
  const [companyItem, setCompanyItem] =
    useState<Interfaces.InSearchCompanyInfoResponseInterface>(
      {} as Interfaces.InSearchCompanyInfoResponseInterface
    );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const { companyid } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
  console.log(companyItem);
  const tabProps = {
    소개: <CompanyIntroduce item={companyItem} />,
    후원: <CompanySituation item={companyItem} />,
  };

  const data = {
    name: companyItem.name,
    receiverId: Number(companyid),
    profileImg: companyItem.profile,
    thumbnail: companyItem.banner,
  };
  return (
    <div className={style.companydetailpage}>
      <DetailPageTop data={data} />
      <CustomizedTabs tabProps={tabProps} />
      <div className={style.message_icon} onClick={openModal}>
        <Icon
          icon="bi:chat-square-dots"
          style={{
            width: "1.5rem",
            height: "1.5rem",
          }}
          className={style.Icon_icon}
        ></Icon>
      </div>
      {isModalOpen && (
        <>
          <div className={style.modalbackground}></div>
          <SendMessageModal onClose={closeModal} data={data} />
        </>
      )}
    </div>
  );
};

export default CompanyDetailPage;
