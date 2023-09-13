// App.tsx

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
import PageNotFound404 from "./pages/PageNotFound404";
import FundingDetailPage from "./pages/FundingDetailPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import SearchPage from "./pages/SearchPage";
import ProfileEditPage from "./pages/ProfileEditPage";
function App() {
  return (
    <div className={style.App}>
      <Routes>
        {/* <Route path="/" Component={??Page}></Route> */}
        <Route path="/" Component={HomePage}></Route>
        <Route path="/list" Component={ListPage}></Route>
        <Route path="/notification" Component={NotificationPage}></Route>
        <Route path="/profile" Component={ProfilePage}></Route>
        <Route path="/login" Component={LogInPage}></Route>
        <Route path="/signup" Component={SignUpPage}></Route>
        <Route path="/search" Component={SearchPage}></Route>
        <Route path="/search/:keyword" Component={SearchResultPage}></Route>
        <Route path="*" Component={PageNotFound404}></Route>
        <Route path="/fundingdetail" Component={FundingDetailPage}></Route>
        <Route path="/companydetail" Component={CompanyDetailPage}></Route>
        <Route path="/profile/edit/:userid" Component={ProfileEditPage}></Route>
      </Routes>
      <div className={style.blank}></div>
      <div className={style.navBar}>
        <NavigationBar />
      </div>
    </div>
  );
}

export default App;
