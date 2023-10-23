import React from "react";
import "./Navbar.css";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const person = useSelector((state) => state.person);
  console.log(person.personInfo);

  const LogOut = () => {
    localStorage.removeItem("token", "user");
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <div>
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

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-left-side">
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
                items,
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
                  {person?.name}
                  <AiOutlineUser size={30} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
