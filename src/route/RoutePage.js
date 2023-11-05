import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import SignUp from "../pages/signUp/SignUp";
import Profile from "../pages/profile/Profile";
import FindTalents from "../pages/FindTalents/FindTalents";
import FindWorks from "../pages/FindWorks/FindWorks";
import Navbar from "../components/Navbar/Navbar";

function RoutePage() {
  return (
    <div>
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

export default RoutePage;
