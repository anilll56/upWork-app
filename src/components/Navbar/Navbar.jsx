import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal, Input, Button } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setPerson } from "../../redux/personSlice";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.person.info);
  const [openModal, setOpenModal] = useState(false);
  console.log(user, "user");

  const LogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("Myjobs");
    navigate("/login");
  };
  const createJob = () => {};

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <div>post a job and hire a pro</div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <div>Browse and a buy a project</div>
        </div>
      ),
      //   disabled: true,
    },
    {
      key: "3",
      label: (
        <div>
          <div>get a advice from our experts</div>
        </div>
      ),
      //   disabled: true,
    },
  ];
  const PersonelInfoItems = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            navigate("/home/profile");
          }}
        >
          <div>Profile</div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <div>Settings</div>
        </div>
      ),
      //   disabled: true,
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            LogOut();
          }}
        >
          <div>Log out</div>
        </div>
      ),
      //   disabled: true,
    },
  ];
  const findWorksOptions = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            navigate("/home/findTalents");
          }}
        >
          <div>Search Freelancer</div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            navigate("/home/findWorks");
          }}
        >
          <div>Search Job</div>
        </div>
      ),
      //   disabled: true,
    },
  ];

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div
          className="navbar-left-side"
          onClick={() => {
            navigate("/home");
          }}
        >
          <h2>Upwork</h2>
        </div>
        <div className="navbar-middle">
          <div className="navbar-middle-dropdown-content">
            <Dropdown
              menu={{
                style: {},
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Find Talent
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="navbar-middle-dropdown-content">
            <Dropdown
              menu={{
                style: {},
                items: findWorksOptions,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Find Work
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="navbar-right-side">
          <div className="navbar-personel-info">
            <Dropdown
              menu={{
                style: {
                  display: "flex",
                  flexDirection: "column",
                  width: "150px",
                },
                items: PersonelInfoItems,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {user?.user?.name}
                  <AiOutlineUser size={30} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <Modal
        title="update job"
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Input placeholder="Job title" />
        <Input placeholder="Job details" />
        <Input placeholder="Job talents" />
        <Input placeholder="Job price" />
        <Button type="primary">Update</Button>
      </Modal>
    </div>
  );
}

export default Navbar;
