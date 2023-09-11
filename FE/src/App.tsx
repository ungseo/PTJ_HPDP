// App.tsx

import "./styles/css/App.css";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import FundingDetailPage from "./pages/FundingDetailPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" Component={??Page}></Route> */}
        <Route path="/" Component={HomePage}></Route>
        <Route path="/list" Component={ListPage}></Route>
        <Route path="/notification" Component={NotificationPage}></Route>
        <Route path="/profile" Component={ProfilePage}></Route>
        <Route path="/login" Component={LogInPage}></Route>
        <Route path="/signup" Component={SignUpPage}></Route>
        <Route path="/fundingdetail" Component={FundingDetailPage}></Route>
        <Route path="/companydetail" Component={CompanyDetailPage}></Route>      </Routes>
      <NavigationBar></NavigationBar>
    </div>
  );
}

export default App;
