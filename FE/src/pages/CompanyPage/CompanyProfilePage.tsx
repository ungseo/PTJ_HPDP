import { useEffect } from "react";
import { OptionTopbar } from "../../components/common/TopBar";
import style from "../../styles/css/CompanyProfilePage.module.css";
import { getMyCompanyInfo } from "../../api/companies";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { companyActions } from "../../store/company-slice";
import ProfileList from "../../components/companyOnly/ProfileList";
import { useNavigate } from "react-router-dom";

const CompanyProfilePage = () => {
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getMyCompanyInfo(
      accessToken,
      (res) => {
        console.log("기업정보불러오기 성공");
        dispatch(companyActions.saveMemberInfo(res.data.data));
      },
      (err) => {
        //기업회원이 아닐때 접근 금지 로직
        // if (err.message.includes("500")) {
        //   alert("잘못된 접근입니다.");
        //   navigate("/");
        // }
        console.log(err.message);
      }
    );
  }, []);
  const companyInfo = useSelector((state: any) => state.company.info.name);
  const companyLogo = useSelector((state: any) => state.company.info.profile);
  return (
    <div className={style.wrapper}>
      <OptionTopbar text="프로필페이지(기업용)" />
      <div className={style.content}>
        <div>
          <img className={style.logo} src={companyLogo} alt="로고없음" />
          <p className={style.P} style={{ fontSize: "1.2rem" }}>
            {companyInfo}
          </p>
        </div>
        <ProfileList />
      </div>
    </div>
  );
};

export default CompanyProfilePage;
