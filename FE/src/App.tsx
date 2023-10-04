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
import { useSelector } from "react-redux";
import RegisterAccountPage from "./pages/RegisterAccountPage";
import CompanyProfilePage from "./pages/CompanyPage/CompanyProfilePage";
import CompanyInfoPage from "./pages/CompanyPage/CompanyInfoPage";
import CompanyFundingPage from "./pages/CompanyPage/CompanyFundingPage";

import { EventSourcePolyfill } from "event-source-polyfill";
import { getAlarms } from "./api/alarms";

import { OutAlarmInfoInterface } from "./interface/apiDataInterface";
import { uiActions } from "./store/ui-slice";
import { useDispatch } from "react-redux";

function App() {
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
        // console.log(data);

        let head = null;
        let body = undefined;

        switch (data.type) {
          case "CREATE":
            head = `${data.companyName}`;
            body = `${data.title} 프로젝트가 등록되었습니다.`;
            break;
          case "START":
            head = `${data.companyName}`;
            body = `${data.title} 프로젝트가 시작되었습니다.`;
            break;
          case "END":
            head = `${data.title}`;
            body = `${data.title} 프로젝트가 종료되었습니다.`;
            break;
          case "SETTLE":
            head = `${data.title}`;
            body = `프로젝트의 후원 금액이 정산되었습니다.`;
            break;
          case "REPORT":
            head = `${data.companyName}`;
            body = `프로젝트의 집행 내역이 등록되었습니다.`;
            break;
          case "POINT":
            head = `끝전`;
            body = `${data.point}이 이체되었습니다.`;
            break;
        }

        if (head !== null) {
          const notification = new Notification(head, {
            body: body,
          });

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

  // alarm
  const dispatch = useDispatch();

  useEffect(() => {
    getAlarms(
      accessToken,
      (res) => {
        const unreadCount = res.data.data.filter(
          (item: OutAlarmInfoInterface) => item.isRead === false
        ).length;

        dispatch(uiActions.changeAlarmCount(unreadCount));
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

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
