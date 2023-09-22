import style from "./styles/css/App.module.css";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchResultPage from "./pages/SearchResultPage";
import FundingDetailPage from "./pages/FundingDetailPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import SearchPage from "./pages/SearchPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import FundingHistoryPage from "./pages/FundingHistoryPage";
import { CheckoutPage } from "./pages/Toss/CheckoutPage";
import { SuccessPage } from "./pages/Toss/SuccessPage";
import { FailPage } from "./pages/Toss/FailPage";
import TestBankPage from "./pages/TestBankPage";
import BankStatementPage from "./pages/BankStatementPage";
import InterestingCompanyPage from "./pages/InterestingCompanyPage";
import MessagePage from "./pages/MessagePage";
import PageNotFound404 from "./pages/PageNotFound404";
import { useEffect } from "react";
import { getMemberInfo } from "./api/members";
import { userActions } from "./store/user-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RegisterAccountPage from "./pages/RegisterAccountPage";
function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  const refresh = () => {
    getMemberInfo(
      accessToken,
      (res) => {
        console.log("유저정보 불러오기성공");
        dispatch(userActions.saveMemberInfo(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    if (accessToken) {
      console.log("hi");
      refresh();
    }
  }, []);
  return (
    <div id="app-root" className={style.App}>
      <Routes>
        {/* <Route path="/" Component={??Page}></Route> */}
        <Route
          path="/"
          Component={HomePage}
        ></Route>
        <Route
          path="/list"
          Component={ListPage}
        ></Route>
        <Route
          path="/notification"
          Component={NotificationPage}
        ></Route>
        <Route
          path="/profile"
          Component={ProfilePage}
        ></Route>
        <Route
          path="/login"
          Component={LogInPage}
        ></Route>
        <Route
          path="/signup"
          Component={SignUpPage}
        ></Route>
        <Route
          path="/search"
          Component={SearchPage}
        ></Route>
        <Route
          path="/search/:keyword"
          Component={SearchResultPage}
        ></Route>
        <Route
          path="/funding/detail/:fundingid"
          Component={FundingDetailPage}
        ></Route>
        <Route
          path="/company/detail/:companyid"
          Component={CompanyDetailPage}
        ></Route>
        <Route
          path="/profile/edit/:userid"
          Component={ProfileEditPage}
        ></Route>
        <Route
          path="/profile/testbank"
          Component={TestBankPage}
        ></Route>
        <Route
          path="/profile/bankstatement/:userid"
          Component={BankStatementPage}
        ></Route>
        <Route
          path="/profile/history/transaction/:userid"
          Component={TransactionHistoryPage}
        ></Route>
        <Route
          path="/profile/history/funding/:userid"
          Component={FundingHistoryPage}
        ></Route>
        <Route
          path="/profile/company/interest/:userid"
          Component={InterestingCompanyPage}
        ></Route>
        <Route
          path="/profile/message/:userid"
          Component={MessagePage}
        ></Route>
        <Route
          path="/payment"
          Component={CheckoutPage}
        ></Route>
        <Route
          path="success"
          Component={SuccessPage}
        ></Route>
        <Route
          path="/fail"
          Component={FailPage}
        ></Route>
        <Route
          path="*"
          Component={PageNotFound404}
        ></Route>
        <Route path="/profile/message/:userid" Component={MessagePage}></Route>
        <Route path="/payment" Component={CheckoutPage}></Route>
        <Route path="success" Component={SuccessPage}></Route>
        <Route path="/fail" Component={FailPage}></Route>
        <Route
          path="/profile/testbank/register/test"
          Component={RegisterAccountPage}
        ></Route>
        <Route path="*" Component={PageNotFound404}></Route>
      </Routes>
      <div className={style.blank}></div>
      <div className={style.navBar}>
        <NavigationBar />
      </div>
    </div>
  );
}

export default App;
