import { useEffect } from "react";
import style from "../../styles/css/CompanyProfilePage.module.css";
import { getMyCompanyInfo } from "../../api/companies";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { companyActions } from "../../store/company-slice";
import ProfileList from "../../components/companyOnly/ProfileList";
import CompanyWallet from "../../components/companyOnly/CompanyWallet";

const CompanyProfilePage = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    getMyCompanyInfo(
      accessToken,
      (res) => {
        console.log("기업정보불러오기 성공");
        dispatch(companyActions.saveMemberInfo(res.data.data));
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);
  const companyInfo = useSelector((state: any) => state.company.info.name);
  const companyLogo = useSelector((state: any) => state.company.info.profile);
  return (
    <div className={style.content}>
      <div className={style.topInfo}>
        <img className={style.logo} src={companyLogo} alt="로고없음" />
        <p className={style.P} style={{ fontSize: "1.2rem" }}>
          {companyInfo}
        </p>
      </div>
      <CompanyWallet />
      <div
        style={{
          width: "100%",
        }}
      >
        <ProfileList />
      </div>
    </div>
  );
};

export default CompanyProfilePage;
