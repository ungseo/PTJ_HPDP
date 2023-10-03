import style from "./styles/css/App.module.css";
import Paper from "@mui/material/Paper";
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
import PointHistoryPage from "./pages/PointHistoryPage";
import FundingHistoryPage from "./pages/FundingHistoryPage";
import { CheckoutPage } from "./pages/Toss/CheckoutPage";
import { SuccessPage } from "./pages/Toss/SuccessPage";
import { FailPage } from "./pages/Toss/FailPage";
import TestBankPage from "./pages/TestBankPage";
import BankStatementPage from "./pages/BankStatementPage";
import InterestingCompanyPage from "./pages/InterestingCompanyPage";
import MessagePage from "./pages/MessagePage";
import PageNotFound404 from "./pages/PageNotFound404";
import { useEffect, useState } from "react";
import { getMemberInfo } from "./api/members";
import { userActions } from "./store/user-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RegisterAccountPage from "./pages/RegisterAccountPage";
import CompanyProfilePage from "./pages/CompanyPage/CompanyProfilePage";
import CompanyInfoPage from "./pages/CompanyPage/CompanyInfoPage";
import CompanyFundingPage from "./pages/CompanyPage/CompanyFundingPage";

import { EventSourcePolyfill } from "event-source-polyfill";

function App() {
  const dispatch = useDispatch();

  //
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);

  //
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollingTimer: any;

    const handleScroll = () => {
      clearTimeout(scrollingTimer);
      setIsScrolling(true);

      scrollingTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // 300으로변경 밀리초 후에도 스크롤이 멈춰있으면 false로 설정
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // sse
  const sse = () => {
    console.log("permission", Notification.permission);

    const eventSource = new EventSourcePolyfill(
      `${process.env.REACT_APP_API_URL}/alarm`,
      {
        headers: {
          accessToken: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("다시 요청하나...?");

    eventSource.addEventListener("sse", async (event) => {
      // console.log(event);

      const data = JSON.parse((event as MessageEvent).data);
      console.log("꺄륵", data);

      // 브라우저 알림 허용 권한
      let granted = false;
      if (Notification.permission === "granted") {
        granted = true;
      } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        granted = permission === "granted";
      }

      // 알림 보여주기
      if (granted) {
        // console.log("뭐지", data);

        let message = null;

        switch (data.type) {
          case "CREATE":
            message = "CREATE 메세지";
            break;
          case "START":
            message = "START 메세지";
            break;
          case "END":
            message = "END 메세지";
            break;
          case "SETTLE":
            message = "SETTLE 메세지";
            break;
          case "REPORT":
            message = "REPORT 메세지";
            break;
          case "POINT":
            message = "POINT  메세지";
            break;
        }

        if (message !== null) {
          const notification = new Notification(message);

          setTimeout(() => {
            notification.close();
          }, 10 * 1000);
        }
      }
    });
  };

  const isLogined = useSelector((state: any) => state.user.auth.isLogined);

  useEffect(() => {
    if (isLogined) {
      console.log("가즈아아");
      sse();
    }
  }, [isLogined]);

  return (
    <Paper id="app-root" className={style.App}>
      <Routes>
        {/* <Route path="/sample" Component={SamplePage}></Route> */}
        <Route path="/" Component={HomePage}></Route>
        <Route path="/list" Component={ListPage}></Route>
        <Route path="/notification" Component={NotificationPage}></Route>
        <Route path="/profile" Component={ProfilePage}></Route>
        <Route path="/login" Component={LogInPage}></Route>
        <Route path="/signup" Component={SignUpPage}></Route>
        <Route path="/search" Component={SearchPage}></Route>
        <Route path="/search/:keyword" Component={SearchResultPage}></Route>
        <Route
          path="/funding/detail/:fundingid"
          Component={FundingDetailPage}
        ></Route>
        <Route
          path="/company/detail/:companyid"
          Component={CompanyDetailPage}
        ></Route>
        <Route path="/profile/edit" Component={ProfileEditPage}></Route>
        <Route path="/profile/testbank" Component={TestBankPage}></Route>
        <Route
          path="/profile/bankstatement"
          Component={BankStatementPage}
        ></Route>
        <Route
          path="/profile/history/transaction"
          Component={PointHistoryPage}
        ></Route>
        <Route
          path="/profile/history/funding"
          Component={FundingHistoryPage}
        ></Route>
        <Route
          path="/profile/company/interest"
          Component={InterestingCompanyPage}
        ></Route>
        <Route path="/profile/message" Component={MessagePage}></Route>
        <Route path="/payment" Component={CheckoutPage}></Route>
        <Route path="success" Component={SuccessPage}></Route>
        <Route path="/fail" Component={FailPage}></Route>
        <Route
          path="/profile/testbank/register"
          Component={RegisterAccountPage}
        ></Route>
        <Route path="/profile/c" Component={CompanyProfilePage}></Route>
        <Route path="/profile/c/info" Component={CompanyInfoPage}></Route>
        <Route
          path="/profile/c/fundings"
          Component={CompanyFundingPage}
        ></Route>
        <Route path="*" Component={PageNotFound404}></Route>
      </Routes>
      <div className={style.blank}></div>
      <div
        className={style.navBar}
        style={{ visibility: isScrolling ? "hidden" : "visible" }}
      >
        <NavigationBar />
      </div>
    </Paper>
  );
}

export default App;
