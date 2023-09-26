import { useEffect } from "react";
import { OptionTopbar } from "../../components/common/TopBar";
import style from "../../styles/css/CompanyProfilePage.module.css";
import { getMyCompanyInfo } from "../../api/companies";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { companyActions } from "../../store/company-slice";
import ProfileList from "../../components/companyOnly/ProfileList";

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
        console.log("내기업조회실패");
      }
    );
  }, []);
  const companyInfo = useSelector((state: any) => state.company.info.name);
  const companyLogo = useSelector((state: any) => state.company.info.profile);
  return (
    <div className={style.wrapper}>
      <OptionTopbar text="프로필페이지(기업용)" />
      <div>
        <img src={companyLogo} alt="로고없음" />
      </div>
      <p>{companyInfo}이름 ㅋ</p>
      <ProfileList />
    </div>
  );
};

export default CompanyProfilePage;
