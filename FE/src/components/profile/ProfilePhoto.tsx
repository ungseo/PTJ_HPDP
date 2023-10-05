import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "../../styles/css/ProfilePhotho.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import PhotoEditButton from "./PhotoEditButton";
import { ProfilePhotoInterFace } from "../../interface/profilePageInterface";
import { getMemberBlockchainInfo } from "../../api/blockchain";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileEditActions } from "../../store/profileEdit-slice";
import WalletAddress from "../common/WalletAddress";

const ProfilePhoto = ({ styles, setSelectedImage }: any) => {
  const navigate = useNavigate();
  const isLogined = useSelector((state: any) => state.user.auth.isLogined);
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const userInfo = useSelector((state: any) => state.user.info);
  const isEditPage = useSelector((state: any) => state.ui.isEditPage);
  const userProfile = useSelector((state: any) => state.user.info.profile);
  const editingProfile = useSelector((state: any) => state.profileEdit.fileURL);
  const [memberBlockChainInfo, setMemberBlockChainInfo] = useState<string>("");
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const profilePhotoURL =
    isEditPage && editingProfile
      ? editingProfile
      : userProfile
      ? userProfile
      : "/default_img.png";

  const goToEditPage = () => {
    navigate(`/profile/edit`);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const firstSettings = () => {
      dispatch(profileEditActions.changeFile(null));
    };
    firstSettings();
  }, []);

  useEffect(() => {
    getMemberBlockchainInfo(
      accessToken,
      (res) => {
        setMemberBlockChainInfo(res.data.data);
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  const handleWalletButtonClick = () => {
    setWalletModalOpen(!isWalletModalOpen);
  };
  const className = !isEditPage ? style.profilePhoto : style.editPhoto;

  return (
    <div className={className}>
      <div
        className={style.walletIcon}
        onClick={handleWalletButtonClick}
        style={{ color: "white" }}
      >
        <Icon icon="bi-wallet2" />
      </div>
      {isLogined && !isEditPage ? (
        <div className={style.leftCpnt}>
          <div className={style.textBox} onClick={goToEditPage}>
            <p className={style.p}>{userInfo.name}</p>
            <span className={style.span}>님</span>
            <Icon icon="bi-pencil-square" style={{ width: "1.3rem" }} />
          </div>
          <p className={style.pp}>{userInfo.loginId}</p>
        </div>
      ) : null}
      <div className={style.photoWrapper}>
        <img
          className={style.img}
          src={profilePhotoURL}
          style={styles}
          alt="프사"
        />
        {isEditPage && <PhotoEditButton setSelectedImage={setSelectedImage} />}
      </div>

      {isWalletModalOpen && (
        <WalletAddress memberBlockChainInfo={memberBlockChainInfo} />
      )}
    </div>
  );
};

export default ProfilePhoto;
