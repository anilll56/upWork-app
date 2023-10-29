import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/profile/Profile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthenticated, setPerson } from "./redux/personSlice";
import HomePage from "./pages/home/HomePage";
import FindTalents from "./pages/FindTalents/FindTalents";
import FindWorks from "./pages/FindWorks/FindWorks";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state) => state.person.person.authenticated
  );
  console.log(authenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      dispatch(setPerson({ user }));
      console.log("kullanıcı var", user);
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setPerson({ user: null }));
      console.log("kullanıcı yok");
      dispatch(setAuthenticated(false));
      navigate("/login");
    }
  }, [authenticated]);

  useEffect(() => {
    console.log(authenticated);
  }, [authenticated]);

  return (
    <div className="App">
      <Routes>
        <Route path="/home/*" element={<Navbar />} />
        <Route path="/" element={<Navbar />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/home/findTalents" element={<FindTalents />} />
        <Route path="/home/findWorks" element={<FindWorks />} />
      </Routes>
    </div>
  );
}

export default App;
