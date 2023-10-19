import React from "react";
import "./LoginPage.css";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";

function LoginPage() {
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
            <button className="login-footer-button">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
