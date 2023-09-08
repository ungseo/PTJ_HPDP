import "./styles/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" Component={??Page}></Route> */}
          <Route></Route>
          <Route></Route>
          <Route path="/login" Component={LogInPage}></Route>
          <Route path="/" Component={HomePage}></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
