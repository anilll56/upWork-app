import React, { useState } from "react";
import "./profile.css";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Modal,
  Avatar,
  Card,
  Row,
  Col,
} from "antd";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import AvailableJobsCont from "../../components/AvailableJobs/AvailableJobsCont";
import CardTable from "../../components/Card/CardTable";
import AddCardTable from "../../components/Card/AddCardTable";

function Profile() {
  const user = useSelector((state) => state.person.person.personInfo);
  const userJobs = useSelector((state) => state.person.person.myJobs.jobs);
  const Myjobs = localStorage.getItem("Myjobs");
  const parsedDataMyJob = JSON.parse(Myjobs);
  const [openModal, setOpenModal] = useState(false);
  const [modalInputValue, setModalInputValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const optionsNames = useSelector((state) => state.person.person.optionsNames);
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

  const changePassword = () => {
    if (modalInputValue.newPassword !== modalInputValue.confirmPassword) {
      alert("passwords not match");
    } else {
      console.log(modalInputValue);
    }
  };
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-left-side">
          <div>
            <Avatar size={64} src={<AiOutlineUser color="grey" size={64} />} />
          </div>
          <div>
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
              <Form.Item label={"Username"} name={"Username"}>
                <Input placeholder={user?.user?.name || ""} />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder={user?.user?.email || ""} />
              </Form.Item>
              {user.type === "freelancer" && (
                <>
                  <Form.Item label="Price" name="Price">
                    <Input />
                  </Form.Item>

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
                </>
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
            <div
              onClick={() => {
                setOpenModal(true);
              }}
              className="profile-change-password"
            >
              Change Password
            </div>
          </div>
        </div>

        <div className="profile-righth-side">
          <div className="profile-righth-side-container">
            {parsedDataMyJob && <AvailableJobsCont jobs={parsedDataMyJob} />}
          </div>
          <div>
            <AddCardTable />
          </div>
        </div>
        <Modal
          title="Change Password"
          open={openModal}
          onOk={() => {
            setOpenModal(false);
          }}
          onCancel={() => {
            setOpenModal(false);
          }}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Input
            placeholder="Old Password"
            type="password"
            className="change-password-input"
            onChange={(e) => {
              setModalInputValue({
                ...modalInputValue,
                oldPassword: e.target.value,
              });
            }}
          />
          <Input
            placeholder="New Password"
            type="password"
            className="change-password-input"
            onChange={(e) => {
              setModalInputValue({
                ...modalInputValue,
                newPassword: e.target.value,
              });
            }}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            className="change-password-input"
            onChange={(e) => {
              setModalInputValue({
                ...modalInputValue,
                confirmPassword: e.target.value,
              });
            }}
          />
          <Button type="primary" className="change-password-input">
            Update
          </Button>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
