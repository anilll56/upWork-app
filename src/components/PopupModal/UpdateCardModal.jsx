import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

function UpdateCardModal() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
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
        <Input placeholder="Old Password" type="password" />
        <Input placeholder="New Password" type="password" />
        <Input placeholder="Confirm Password" />
        <Button type="primary">Update</Button>
      </Modal>
    </div>
  );
}

export default UpdateCardModal;
