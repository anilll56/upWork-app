import { Button, Cascader, Checkbox, Form, Input, Select } from "antd";
import React, { useState } from "react";
import "./SignUp.css";

function SignUp() {
  const [userType, setUserType] = useState("client");
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const optionsNames = [
    "Web, Mobile & Software Dev",
    "IT & Networking",
    "Data Science & Analytics",
    "Engineering & Architecture",
    "Design & Creative",
    "Writing",
    "Translation",
    "React",
    "javaScript",
    "Node.js",
    "Angular",
    "React Native",
    "Android",
    "iOS",
    "Python",
    "Django",
    "Flask",
  ];
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
              <Input type="text" id="name" placeholder="name" size="large" />
            </div>
            <div className="form-navbar-input-cont">
              <Input
                type="text"
                id="lastName"
                placeholder="last name"
                size="large"
              />
            </div>
          </div>
          <div className="sign-up-input-cont">
            <Input type="email" id="email" placeholder="email" size="large" />
          </div>
          <div className="sign-up-input-cont">
            <Input
              type="password"
              id="password"
              placeholder="password"
              size="large"
            />
          </div>
          <div className="sign-up-input-cont">
            <Input
              id="confirmPassword"
              placeholder="confrim password"
              size="large"
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
                placeholder="Please select"
                options={options}
              />
            </div>
          )}
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="sign-up-button"
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
