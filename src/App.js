import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/profile/Profile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthenticated, setPerson, setMyJobs } from "./redux/personSlice";
import HomePage from "./pages/home/HomePage";
import FindTalents from "./pages/FindTalents/FindTalents";
import FindWorks from "./pages/FindWorks/FindWorks";
import {
  getTheClientJobByEmail,
  getTheFreelancerJobByEmail,
} from "./api/HandleApi";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const userEmail = JSON.parse(user)?.email;
  const userRole = JSON.parse(user)?.role;
  const authenticated = useSelector(
    (state) => state.person.person.authenticated
  );
  // const myjobs = useSelector((state) => state.person.person.myjobs);
  // console.log(myjobs, "myjobs11");
  const fetchClientJobs = async () => {
    try {
      if (userRole === "freelancer") {
        const response = await getTheFreelancerJobByEmail(userEmail);
        console.log(response, "response.data");
        localStorage.setItem("Myjobs", JSON.stringify(response.data));
      } else if (userRole === "client") {
        const response = await getTheClientJobByEmail(userEmail);
        localStorage.setItem("Myjobs", JSON.stringify(response.data));
        dispatch(setMyJobs(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    fetchClientJobs();
    if (user) {
      dispatch(setPerson({ user }));
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setPerson({ user: null }));
      console.log("kullanıcı yok");
      dispatch(setAuthenticated(false));
      navigate("/login");
    }
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
