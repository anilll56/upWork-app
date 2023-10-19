import React from "react";
import "./Navbar.css";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

function Navbar() {
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
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-left-side">Upwork</div>
        <div className="navbar-middle">
          <Dropdown
            style={{ color: "red" }}
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
        <div className="navbar-right-side"></div>
      </div>
    </div>
  );
}

export default Navbar;
