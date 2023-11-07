import React from "react";
import { Card } from "antd";
import { AiOutlineClose, FaRegEdit } from "react-icons/all";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { AiOutlineClose, FaRegEdit } from "react-icons/all";

function UserCard() {
  return (
    <div>
      <Card
        title={job.name}
        bordered={false}
        style={{
          width: 300,
          height: 340,
          margin: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "15px",
          backgroundColor: "#f5f5f5",
          alignItems: "center",
          fontSize: "13px",
          fontWeight: "bold",
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
              {job["work-status"] === "available" && (
                <FaRegEdit size={15} color="blue" />
              )}
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
          <div> Price : {job["work-price"]}</div>
        </div>
        {job["apployed-freelancersInfo"] && (
          <div className="card-table-apployed-freelancersInfo">
            <div>
              {" "}
              Apployed Freelancers Info : {job["apployed-freelancersInfo"]}
            </div>
          </div>
        )}
        <div className="card-table-status">
          {userEmail === job.email && job["work-status"] === "pending" && (
            <div className="card-table-status-buttons">
              <Button
                type="primary"
                onClick={() => {
                  AcceptJob();
                }}
              >
                Accept
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  RejectJob();
                }}
              >
                Reject
              </Button>
            </div>
          )}
          <div>{job["work-status"]}</div>
        </div>
        {userEmail !== job.email && (
          <div className="card-table-button">
            {job["work-status"] === "accepted" && UserRole === "freelancer" && (
              <Button
                onClick={() => {
                  ComplateJob(job.id);
                }}
              >
                Complate Job
              </Button>
            )}
            <Button
              disabled={job["work-status"] === "available" ? false : true}
              onClick={() => {
                if (UserRole === "freelancer") {
                  setOpenModalInfo(true);
                } else {
                  hireFreelancer();
                }
              }}
            >
              {job["work-status"]}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default UserCard;
