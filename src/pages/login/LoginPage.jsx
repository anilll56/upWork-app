import React, { useState } from "react";
import "./LoginPage.css";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LoginClientUser, LoginfreelancerUser } from "../../api/HandleApi";
import { useSelector, useDispatch } from "react-redux";
import { setPerson } from "../../redux/personSlice";
import { Form, Checkbox } from "antd";
import { LoginUser } from "../../api/HandleApi";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("aniltan33322@hotmail.com");
  const [password, setPassword] = useState("anil11");
  const person = useSelector((state) => state.person.person);
  const [userType, setUserType] = useState("freelancer");
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const SignUp = () => {
    console.log(loginInputs);
    LoginUser(loginInputs.email, loginInputs.password, userType).then((res) => {
      dispatch(setPerson(res));
      navigate("/home");
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">Login to Upwork</div>
        <div className="login-checkboxs">
          <div>
            <Checkbox
              type="radio"
              name="userType"
              value="client"
              onChange={handleUserTypeChange}
              checked={userType === "client"}
            />
            <div>Client</div>
          </div>
          <div>
            <Checkbox
              type="radio"
              name="userType"
              value="freelancer"
              onChange={handleUserTypeChange}
              checked={userType === "freelancer"}
            />
            <div>Freelancer</div>
          </div>
        </div>

        <div className="login-content">
          <div className="login-container__form">
            <Form className="login-form">
              <div className="login-input-div">
                <CiUser size={20} />
                <input
                  type="text"
                  placeholder="email"
                  className="login-input"
                  onChange={(event) => {
                    setLoginInputs({
                      ...loginInputs,
                      email: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="login-input-div">
                <RiLockPasswordFill size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  className="login-input"
                  onChange={(event) => {
                    setLoginInputs({
                      ...loginInputs,
                      password: event.target.value,
                    });
                  }}
                />
              </div>
              <button
                type="submit"
                className="login-button"
                onClick={() => {
                  console.log("login");
                  SignUp();
                }}
              >
                Login
              </button>
            </Form>
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
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
