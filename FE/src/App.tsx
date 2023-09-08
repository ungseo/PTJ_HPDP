import "./styles/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" Component={??Page}></Route> */}
<<<<<<< Updated upstream
          <Route></Route>
          <Route></Route>
=======
          <Route path="/login" Component={LogInPage}></Route>
          <Route path="/" element={<HomePage />}></Route>
>>>>>>> Stashed changes
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
