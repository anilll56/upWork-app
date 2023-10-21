import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/profile/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home*" element={<Navbar />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/profile" element={<Profile></Profile>} />
      </Routes>
    </div>
  );
}

export default App;
