import "./App.css";
import { useState, useEffect } from "react";
import { Routes, useNavigate } from "react-router-dom";
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
import RoutePage from "./route/RoutePage";
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
  const authenticated = useSelector((state) => state.person.authenticated);
  const reduxUser = useSelector((state) => state.person.info);

  const fetchJobs = async () => {
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
  const userInfo = useSelector((state) => state.person.info);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchJobs();
    if (user) {
      dispatch(setPerson({ user: user }));
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setPerson({ user: null }));
      console.log("kullanıcı yok");
      dispatch(setAuthenticated(false));
      navigate("/login");
    }
  }, [authenticated, userRole, userEmail, dispatch]);

  return (
    <div className="App">
      <RoutePage />
    </div>
  );
}

export default App;
