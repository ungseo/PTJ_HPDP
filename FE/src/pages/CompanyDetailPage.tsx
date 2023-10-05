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
import { getCompanyBlockchainInfo } from "../api/blockchain";
import WalletAddress from "../components/common/WalletAddress";

const CompanyDetailPage = () => {
  // 상세 조회
  const { companyid } = useParams();

  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const [companyBlockChainInfo, setCompanyBlockChainInfo] =
    useState<string>("");
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [companyItem, setCompanyItem] =
    useState<Interfaces.InSearchCompanyInfoResponseInterface>(
      {} as Interfaces.InSearchCompanyInfoResponseInterface
    );

  useEffect(() => {
    getCompanyItem(
      accessToken,
      Number(companyid),
      (res) => {
        setCompanyItem(res.data.data);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  useEffect(() => {
    getCompanyBlockchainInfo(
      accessToken,
      Number(companyid),
      (res) => {
        setCompanyBlockChainInfo(res.data.data);
      },
      (err) => {
        console.error("API 호출 실패:", err);
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
  const handleWalletButtonClick = () => {
    setWalletModalOpen(!isWalletModalOpen);
  };
  const changeModal = () => {
    setModalStatus(!modalStatus);
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
      <div
        className={style.walletIcon}
        onClick={handleWalletButtonClick}
        style={{
          color: "white",
          zIndex: modalStatus ? 0 : 1,
        }}
      >
        <Icon icon="bi-wallet2" />
      </div>
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
      {isWalletModalOpen && (
        <WalletAddress memberBlockChainInfo={companyBlockChainInfo} />
      )}
    </div>
  );
};

export default CompanyDetailPage;
