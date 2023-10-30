import React, { useState } from "react";
import { Card, Button, Modal, Input, Select } from "antd";
import { GrAdd } from "react-icons/gr";
import "./Card.css";
import { useSelector } from "react-redux";
import { AddClientJob } from "../../api/HandleApi";

function AddCardTable() {
  const [openModal, setOpenModal] = useState(false);
  const email = useSelector(
    (state) => state?.person?.person?.personInfo?.user?.email
  );
  const [addCardInputs, setAddCardInputs] = useState({
    jobTitle: "",
    email: email,
    jobDetails: "",
    jobTalents: "",
    jobPrice: "",
  });
  const optionsNames = useSelector((state) => state.person.person.optionsNames);
  const options = optionsNames.map((option) => {
    return {
      value: option,
      label: option,
    };
  });
  const addNewCard = () => {
    AddClientJob(
      addCardInputs.jobTitle,
      addCardInputs.email,
      addCardInputs.jobDetails,
      addCardInputs.jobTalents,
      addCardInputs.jobPrice
    ).then((res) => {
      setOpenModal(false);
      window.location.reload();
    });
  };

  return (
    <div>
      <Card
        onClick={() => {
          setOpenModal(true);
        }}
        title="Create New Job"
        bordered={false}
        style={{ width: 250, height: 250, margin: "10px" }}
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
            addNewCard();
          }}
        >
          Add
        </Button>
      </Modal>
    </div>
  );
}

export default AddCardTable;
