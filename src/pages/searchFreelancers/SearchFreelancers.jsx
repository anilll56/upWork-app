import React, { useEffect, useState } from "react";
import { getFreelancerUsers, hireUserForTheJob } from "../../api/HandleApi";
import "./SearchFreelancers.css";
import { Button, Dropdown, Input, Modal, Select, Space } from "antd";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { AiOutlineCheckCircle } from "react-icons/ai";

function SearchFreelancers() {
  const [getUsers, setGetUsers] = useState([]);
  const [searchBy, setSearchBy] = useState("talent");
  const optionsNames = useSelector((state) => state.person.optionsNames);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchPrice, setSearchPrice] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [sendInfo, setSendInfo] = useState("");
  const user = useSelector((state) => state.person.info.user);
  const options = optionsNames.map((option) => {
    return {
      value: option,
      label: option,
    };
  });

  const HireFreelancer = (user) => {
    console.log(user, sendInfo);
    setOpenModal(false);
  };

  const stringSelectedItems = selectedItems.toString();
  const selectedItemNoSpace = stringSelectedItems.replace(/\s/g, "");
  useEffect(() => {
    getFreelancerUsers().then((res) => {
      setGetUsers(res);
    });
    if (searchBy === "talent") {
      const cleanedUsers = getUsers.map((user) => ({
        ...user,
        talent: user.talent.replace(/\s/g, ""),
      }));
      const filteredUsers = cleanedUsers.filter((user) =>
        selectedItemNoSpace.includes(user.talent)
      );
      setSearchResults(filteredUsers);
    } else if (searchBy === "price") {
      const filteredUsers = getUsers.filter(
        (user) => String(searchPrice) === String(user.price)
      );
      console.log(searchPrice);
      console.log(filteredUsers);
      setSearchResults(filteredUsers);
    }
  }, [selectedItems, searchPrice]);

  const SearchItems = [
    {
      key: "1",
      label: (
        <div>
          <div
            onClick={() => {
              setSearchBy("talent");
            }}
          >
            Search by Talent
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setSearchBy("price");
          }}
        >
          <div>Search by Price</div>
        </div>
      ),
      //   disabled: true,
    },
  ];
  return (
    <div className="search-freelancers">
      <div className="search-freelancers-inputs">
        <Dropdown
          menu={{
            items: SearchItems,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space className="search-freelancers-dropdown">
              Search By
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>

        {searchBy === "price" ? (
          <Input
            value={searchPrice}
            onChange={(e) => {
              setSearchPrice(e.target.value);
            }}
            type="number"
            placeholder="Search by Price"
            className="search-freelancers-input"
          />
        ) : (
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "40%",
            }}
            placeholder="Search User by Talent"
            options={options}
            onChange={(value) => {
              setSelectedItems(value);
            }}
          />
        )}
      </div>
      <div className="search-freelancers-container">
        {searchResults.length > 0
          ? searchResults?.map((user) => {
              return (
                <div className="user-card">
                  <div className="user-card-left-side">
                    <div className="user-card-name">{user.name}</div>
                    <div className="user-card-talent">{user.talent}</div>
                  </div>
                  <div className="user-card-right-side">
                    <div className="user-card-price">{user.price}</div>
                    <div
                      className="user-card-icon"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      <AiOutlineCheckCircle size={40} />
                    </div>
                  </div>
                </div>
              );
            })
          : getUsers?.map((user) => {
              return (
                <div className="user-card">
                  <div className="user-card-left-side">
                    <div className="user-card-name">{user.name}</div>
                    <div className="user-card-talent">{user.talent}</div>
                  </div>
                  <div className="user-card-right-side">
                    <div className="user-card-price">{user.price}</div>
                    <div
                      className="user-card-icon"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <AiOutlineCheckCircle size={40} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <Modal
        title="send a message"
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
          size="large"
          onChange={(e) => {
            setSendInfo(e.target.value);
          }}
          placeholder="Enter your message here"
        />
        <Button
          style={{
            margin: "10px",
          }}
          onClick={() => {
            HireFreelancer(user);
          }}
        >
          Hire
        </Button>
      </Modal>
    </div>
  );
}

export default SearchFreelancers;
