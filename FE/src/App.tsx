import "./styles/css/App.css";
import { Routes, Route } from 'react-router-dom'
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" Component={??Page}></Route> */}
        <Route path="/login" Component={LogInPage}></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
