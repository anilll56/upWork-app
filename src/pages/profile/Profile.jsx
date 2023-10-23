import React, { useState } from "react";
import "./profile.css";
import { Form, Input, Button, Checkbox, Select } from "antd";

function Profile() {
  const [userType, setUserType] = useState("freelancer");
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
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="profile">
      <div className="profile-container">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          {userType === "freelancer" && (
            <Form.Item label="Talent" name="Talent">
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                options={options}
              />
            </Form.Item>
          )}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
        <div>Change Password</div>
      </div>
    </div>
  );
}

export default Profile;
