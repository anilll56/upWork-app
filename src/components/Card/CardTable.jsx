import React, { useState } from "react";
import { Card, Button, Modal, Input } from "antd";
import "./Card.css";
import { FaRegEdit } from "react-icons/fa";

function CardTable({ job }) {
  const [josHired, setJobsHired] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Card
        title={job.name}
        bordered={false}
        style={{ width: 250, margin: "10px" }}
        hoverable
      >
        <div className="card-table-navbar">
          <div className="card-table-job-title">{job.name}</div>
          <div
            className="card-table-change-job-details"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <FaRegEdit size={15} />
          </div>
        </div>
        <div className="card-table-details">
          <div>{job["work-description"]}</div>
        </div>
        <div className="card-table-price">
          <div className="card-table-price-title">Price :</div>
          <div> {job["work-price"]}</div>
        </div>
        <div className="card-table-status">job received</div>
        {!josHired && (
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
        <Input placeholder="Job title" className="update-job-input" />
        <Input placeholder="Job details" className="update-job-input" />
        <Input placeholder="Job talents" className="update-job-input" />
        <Input placeholder="Job price" className="update-job-input" />
        <Button type="primary" className="update-job-button">
          Update
        </Button>
      </Modal>
    </div>
  );
}

export default CardTable;
