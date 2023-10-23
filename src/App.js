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
      console.log("kullanıcı var");
      dispatch(setAuthenticated(true));
      navigate("/home");
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
        {authenticated && <Route path="/home/*" element={<Navbar />} />}
      </Routes>
      {!authenticated && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
