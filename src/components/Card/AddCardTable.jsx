import React, { useState } from "react";
import { Card, Button, Modal, Input, Select } from "antd";
import { GrAdd } from "react-icons/gr";
import "./Card.css";
import { useSelector, useDispatch } from "react-redux";
import { AddClientJob, addFreelancerJob, fetchJobs } from "../../api/HandleApi";
import { addCard, setMyJobs } from "../../redux/personSlice";

function AddCardTable() {
  const [openModal, setOpenModal] = useState(false);
  const user = localStorage.getItem("user");
  const email = JSON.parse(user).email;
  const UserRole = JSON.parse(user).role;
  const dispatch = useDispatch();

  const [addCardInputs, setAddCardInputs] = useState({
    jobTitle: "",
    email: email,
    jobDetails: "",
    jobTalents: "",
    jobPrice: "",
  });
  const optionsNames = useSelector((state) => state.person.optionsNames);
  const options = optionsNames.map((option) => {
    return {
      value: option,
      label: option,
    };
  });
  const addNewCard = () => {
    if (UserRole === "client") {
      AddClientJob(
        addCardInputs.jobTitle,
        addCardInputs.email,
        addCardInputs.jobDetails,
        addCardInputs.jobTalents,
        addCardInputs.jobPrice
      ).then((res) => {
        setOpenModal(false);
        setTimeout(() => {
          fetchJobs(email, UserRole);
          window.location.reload();
        }, 1000);
      });
    } else if (UserRole === "freelancer") {
      addFreelancerJob(
        addCardInputs.jobTitle,
        addCardInputs.email,
        addCardInputs.jobDetails,
        addCardInputs.jobTalents,
        addCardInputs.jobPrice
      ).then((res) => {
        setOpenModal(false);
        setTimeout(() => {
          fetchJobs(email, UserRole);
          window.location.reload();
        }, 1000);
      });
    }
    dispatch(
      addCard(
        addCardInputs.jobTitle,
        addCardInputs.email,
        addCardInputs.jobDetails,
        addCardInputs.jobTalents,
        addCardInputs.jobPrice
      )
    );
  };
  return (
    <div>
      <Card
        className="add-card"
        onClick={() => {
          setOpenModal(true);
        }}
        title={<div className="add-card-title">Create New Job</div>}
        bordered={false}
        style={{
          width: 280,
          height: 280,
          margin: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        hoverable
      >
        <GrAdd size={50} />
      </Card>
      <Modal
        title="Add New Card"
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Input
          placeholder="Job title"
          className="add-job-input"
          onChange={(e) => {
            setAddCardInputs({
              ...addCardInputs,
              jobTitle: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Job details"
          className="add-job-input"
          onChange={(e) => {
            setAddCardInputs({
              ...addCardInputs,
              jobDetails: e.target.value,
            });
          }}
        />
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          className="add-job-input"
          placeholder="Please select"
          options={options}
          onChange={(value) => {
            setAddCardInputs({
              ...addCardInputs,
              jobTalents: value,
            });
          }}
        />
        <Input
          placeholder="Job price"
          className="add-job-input"
          type="number"
          onChange={(e) => {
            setAddCardInputs({
              ...addCardInputs,
              jobPrice: e.target.value,
            });
          }}
        />
        <Button
          type="primary"
          className="add-job-input"
          onClick={() => {
            if (
              !addCardInputs.jobTitle ||
              !addCardInputs.jobDetails ||
              addCardInputs.jobTalents.length === 0 ||
              !addCardInputs.jobPrice
            ) {
              alert("Please fill all the inputs");
            } else {
              addNewCard();
            }
          }}
        >
          Add
        </Button>
      </Modal>
    </div>
  );
}

export default AddCardTable;
