import { Button, Checkbox, Form, Input, Rate, Select } from "antd";
import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { SignupClientUser, SignupfreelancerUser } from "../../api/HandleApi";
import { BiChevronLeft } from "react-icons/bi";
import { useSelector } from "react-redux";

function SignUp() {
  const [userType, setUserType] = useState("freelancer");

  const navigave = useNavigate();
  const [signUpInputs, setSignUpInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: [],
    price: "",
  });
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const signup = () => {
    if (signUpInputs.password !== signUpInputs.confirmPassword) {
      return alert("passwords don't match");
    } else {
      if (userType === "client") {
        if (
          signUpInputs.name === "" ||
          signUpInputs.email === "" ||
          signUpInputs.password === "" ||
          signUpInputs.confirmPassword === ""
        ) {
          return alert("please fill all the inputs");
        } else {
          SignupClientUser(
            signUpInputs.name,
            signUpInputs.email,
            signUpInputs.password
          ).then((res) => {
            navigave("/login");
          });
        }
      } else {
        if (
          signUpInputs.name === "" ||
          signUpInputs.email === "" ||
          signUpInputs.password === "" ||
          signUpInputs.confirmPassword === "" ||
          signUpInputs.skills.length === 0
        ) {
          return alert("please fill all the inputs");
        } else {
          SignupfreelancerUser(
            signUpInputs.name,
            signUpInputs.email,
            signUpInputs.password,
            signUpInputs.skills,
            signUpInputs.price
          ).then((res) => {
            navigave("/login");
          });
        }
      }
    }
  };
  console.log(signUpInputs.price, "price");
  const optionsNames = useSelector((state) => state.person.optionsNames);
  const options = optionsNames.map((option) => {
    return {
      value: option,
      label: option,
    };
  });

  return (
    <div className="sign-up">
      <div className="sign-up-container">
        <div className="sign-up-header">Sign Up </div>
        <div className="sign-up-checkboxs">
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
        <Form
          style={{
            marginTop: "20px",
          }}
        >
          <div className="form-name">
            <div className="form-navbar-input-cont">
              <Input
                type="text"
                id="name"
                placeholder="name"
                size="large"
                onChange={(event) => {
                  setSignUpInputs({
                    ...signUpInputs,
                    name: event.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="sign-up-input-cont">
            <Input
              type="email"
              id="email"
              placeholder="email"
              size="large"
              onChange={(event) => {
                setSignUpInputs({
                  ...signUpInputs,
                  email: event.target.value,
                });
              }}
            />
          </div>
          <div className="sign-up-input-cont">
            <Input
              type="password"
              id="password"
              placeholder="password"
              size="large"
              onChange={(event) => {
                setSignUpInputs({
                  ...signUpInputs,
                  password: event.target.value,
                });
              }}
            />
          </div>
          <div className="sign-up-input-cont">
            <Input
              type="password"
              id="confirmPassword"
              placeholder="confrim password"
              size="large"
              onChange={(event) => {
                setSignUpInputs({
                  ...signUpInputs,
                  confirmPassword: event.target.value,
                });
              }}
            />
          </div>
          {userType === "freelancer" && (
            <div className="sign-up-input-cont">
              <Select
                size="large"
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select your Skills"
                options={options}
                onChange={(value) => {
                  setSignUpInputs({
                    ...signUpInputs,
                    skills: value,
                  });
                }}
              />
            </div>
          )}
          {userType === "freelancer" && (
            <div className="sign-up-input-cont">
              <Input
                size="large"
                type="number"
                value={signUpInputs.price}
                onChange={(event) => {
                  setSignUpInputs({
                    ...signUpInputs,
                    price: event.target.value,
                  });
                }}
              />
            </div>
          )}
          <div className="buttons-div">
            <Button
              className="sign-up-button"
              size="large"
              type="primary"
              htmlType="submit"
              onClick={() => {
                navigave("/login");
              }}
            >
              <BiChevronLeft size={30} /> Go Login
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="sign-up-button"
              onClick={() => {
                signup();
              }}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
