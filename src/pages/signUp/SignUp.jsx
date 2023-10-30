import { Button, Cascader, Checkbox, Form, Input, Rate, Select } from "antd";
import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { SignupClientUser, SignupfreelancerUser } from "../../api/HandleApi";
import { BiChevronLeft } from "react-icons/bi";
import { useSelector } from "react-redux";

function SignUp() {
  const [userType, setUserType] = useState("freelancer");
  const [rating, setRating] = useState(3);
  const navigave = useNavigate();
  const [signUpInputs, setSignUpInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: [],
    price: "",
  });
  // console.log(signUpInputs, "signUpInputs");
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const HnadleRatingChange = (event) => {
    setRating(event);
  };
  let name = "Anıl";
  let mail = "deddd111@hotmail.com";
  let password = "anil11";
  let talent = "React";
  let price = "20";
  const signup = () => {
    if (signUpInputs.password !== signUpInputs.confirmPassword) {
      return alert("passwords don't match");
    } else {
      if (userType === "client") {
        SignupClientUser(
          signUpInputs.name,
          signUpInputs.email,
          signUpInputs.password
        ).then((res) => {
          navigave("/login");
        });
      } else {
        SignupfreelancerUser(
          signUpInputs.name,
          signUpInputs.email,
          signUpInputs.password,
          signUpInputs.skills,
          signUpInputs.price
        );
      }
    }
  };

  const optionsNames = useSelector((state) => state.person.person.optionsNames);
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
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select your Skills"
                options={options}
              />
            </div>
          )}
          {userType === "freelancer" && (
            <div className="sign-up-price-cont">
              <div>Choose your price</div>
              <Rate value={rating} onChange={HnadleRatingChange} />
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
