import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Login from "./pages/Login";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
