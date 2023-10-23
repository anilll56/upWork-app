import React, { useState } from "react";
import "./LoginPage.css";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LoginfreelancerUser } from "../../api/HandleApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPerson } from "../../redux/personSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("aniltan33322@hotmail.com");
  const [password, setPassword] = useState("anil11");
  const person = useSelector((state) => state.person.person);
  const handleSubmit = () => {
    LoginfreelancerUser(email, password).then((res) => {
      if (res) {
        dispatch(setPerson(res));
        navigate("/home");
      }
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">Login to Upwork</div>
        <div className="login-content">
          <div className="login-container__form">
            <form className="login-form">
              <div className="login-input-div">
                <CiUser size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  className="login-input"
                />
              </div>
              <div className="login-input-div">
                <RiLockPasswordFill size={20} />
                <input
                  type="text"
                  placeholder="Password"
                  className="login-input"
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="login-footer">
          <div className="login-footer-title">
            <hr className="login-hr" />
            <div>Don't have an Upwork account?</div>
            <hr className="login-hr" />
          </div>
          <div>
            <button
              className="login-footer-button"
              onClick={() => {
                navigate("/signUp");
              }}
            >
              Sign Up
            </button>
          </div>
          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            deneme
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
