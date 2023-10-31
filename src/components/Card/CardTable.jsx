import React, { useState } from "react";
import { Card, Button, Modal, Input, Form, Select } from "antd";
import "./Card.css";
import { FaRegEdit } from "react-icons/fa";
import {
  updateTheClientJob,
  updateTheFreelancerJob,
} from "../../api/HandleApi";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { deleteTheJob } from "../../api/HandleApi";

function CardTable({ job }) {
  const [josHired, setJobsHired] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const user = localStorage.getItem("user");
  const userEmail = JSON.parse(user).email;
  const optionsNames = useSelector((state) => state.person.person.optionsNames);
  const [selectedItems, setSelectedItems] = useState(job["work-type"]);
  const UserRole = JSON.parse(user).role;
  const options = optionsNames.map((option) => {
    return {
      value: option,
      label: option,
    };
  });
  const [updateJobInputs, setUpdateJobInputs] = useState({
    id: job.id,
    name: job.name,
    "work-description": job["work-description"],
    "work-type": selectedItems,
    "work-price": job["work-price"],
  });

  const UpdateJob = () => {
    if (UserRole === "client") {
      updateTheClientJob(
        updateJobInputs.id,
        updateJobInputs.name,
        updateJobInputs.email,
        updateJobInputs["work-description"],
        updateJobInputs["work-type"],
        updateJobInputs["work-price"]
      ).then((res) => {
        setOpenModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
    } else {
      updateTheFreelancerJob(
        updateJobInputs.id,
        updateJobInputs.name, // name alanı
        updateJobInputs.email, // email alanı
        updateJobInputs["work-description"], // jobDetails alanı
        updateJobInputs["work-type"], // jobTalents alanı
        updateJobInputs["work-price"] // jobPrice alanı
      ).then((res) => {
        setOpenModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
    }
  };

  return (
    <div>
      <Card
        extra={
          userEmail === job.email && (
            <div
              onClick={() => {
                deleteTheJob(job.id, UserRole).then((res) => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                });
              }}
            >
              <AiOutlineClose size={15} />
            </div>
          )
        }
        title={job.name}
        bordered={false}
        style={{
          width: 300,
          height: 300,
          margin: "10px",
        }}
        hoverable
      >
        <div className="card-table-navbar">
          {job.email === userEmail && (
            <div
              className="card-table-change-job-details"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <FaRegEdit size={15} color="blue" />
            </div>
          )}
        </div>
        <div className="card-table-details">
          <div> Details: {job["work-description"]}</div>
        </div>
        <div className="card-table-talent">
          <div> Talent : {job["work-type"]}</div>
        </div>
        <div className="card-table-price">
          <div className="card-table-price-title">Price :</div>
          <div> {job["work-price"]}</div>
        </div>
        <div className="card-table-status">job received</div>
        {userEmail !== job.email && (
          <div className="card-table-button">
            <Button>Apply</Button>
          </div>
        )}
      </Card>
      <Modal
        title="update job"
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form>
          <Form.Item label={"Name"} name={"Name"} valuePropName>
            <Input
              value={updateJobInputs.name}
              placeholder={job.name}
              onChange={(e) =>
                setUpdateJobInputs({ ...updateJobInputs, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label={"Description"} name={"Description"} valuePropName>
            <Input
              value={updateJobInputs["work-description"]}
              placeholder={job["work-description"]}
              onChange={(e) =>
                setUpdateJobInputs({
                  ...updateJobInputs,
                  "work-description": e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label={"Talent"} name={"Talent"} valuePropName>
            <Select
              className="add-job-input"
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              options={options}
              onChange={(value) => {
                setSelectedItems(value);
              }}
              value={selectedItems}
            />
          </Form.Item>
          <Form.Item label={"Price"} name={"Price"} valuePropName>
            <Input
              type="number"
              value={updateJobInputs["work-price"]}
              placeholder={job["work-price"]}
              onChange={(e) =>
                setUpdateJobInputs({
                  ...updateJobInputs,
                  "work-price": e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          className="update-job-button"
          onClick={() => {
            UpdateJob();
          }}
        >
          Update
        </Button>
      </Modal>
    </div>
  );
}

export default CardTable;
