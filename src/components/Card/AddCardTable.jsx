import React, { useState } from "react";
import { Card, Button, Modal, Input } from "antd";
import { GrAdd } from "react-icons/gr";

function AddCardTable() {
  const [openModal, setOpenModal] = useState(false);
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
        <Input placeholder="Job title" />
        <Input placeholder="Job details" />
        <Input placeholder="Job talents" />
        <Input placeholder="Job price" />
        <Button type="primary">Add</Button>
      </Modal>
    </div>
  );
}

export default AddCardTable;
