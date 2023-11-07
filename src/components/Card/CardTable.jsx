import React, { useState } from "react";
import { Card, Button, Modal, Input, Form, Select } from "antd";
import "./Card.css";
import { FaRegEdit } from "react-icons/fa";
import {
  ApplyJob,
  fetchJobs,
  updateTheClientJob,
  updateTheFreelancerJob,
  RejectUserForTheJob,
  AcceptUserForTheJob,
  hireUserForTheJob,
  complateTheJob,
} from "../../api/HandleApi";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { deleteTheJob } from "../../api/HandleApi";
import { setMyJobs } from "../../redux/personSlice";

function CardTable({ job }) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const user = localStorage.getItem("user");
  const userEmail = JSON.parse(user).email;
  const optionsNames = useSelector((state) => state.person.optionsNames);
  const [selectedItems, setSelectedItems] = useState(job["work-type"]);
  const UserRole = JSON.parse(user).role;
  const userRedux = useSelector((state) => state.person.info);
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
  const [ApplyJobInfo, setApplyJobInfo] = useState("");
  const Apply = () => {
    if (UserRole === "freelancer") {
      ApplyJob(job.id, userRedux.user.name, userEmail, ApplyJobInfo).then(
        (res) => {
          setTimeout(() => {
            fetchJobs(userEmail, UserRole);
            window.location.reload();
          }, 2000);
          setOpenModalInfo(false);
        }
      );
    } else if (UserRole === "client") {
      ApplyJob(job.id, userEmail).then((res) => {
        setTimeout(() => {
          fetchJobs(userEmail, UserRole);
          window.location.reload();
        }, 2000);
        setOpenModalInfo(false);
      });
    }
  };

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
          fetchJobs(userEmail, UserRole);
          window.location.reload();
        }, 1000);
      });
    } else {
      updateTheFreelancerJob(
        updateJobInputs.id,
        updateJobInputs.name,
        updateJobInputs.email,
        updateJobInputs["work-description"],
        updateJobInputs["work-type"],
        updateJobInputs["work-price"]
      ).then((res) => {
        setOpenModal(false);
        setTimeout(() => {
          fetchJobs(userEmail, UserRole);
          window.location.reload();
        }, 1000);
      });
    }
  };
  const AcceptJob = () => {
    AcceptUserForTheJob(job.id).then((res) => {
      setTimeout(() => {
        fetchJobs(userEmail, UserRole);
        window.location.reload();
      }, 1000);
    });
  };

  const RejectJob = () => {
    RejectUserForTheJob(job.id).then((res) => {
      setTimeout(() => {
        fetchJobs(userEmail, UserRole);
        window.location.reload();
      }, 100);
    });
  };

  const hireFreelancer = () => {
    hireUserForTheJob(job.id, userRedux?.user?.name, userEmail).then((res) => {
      setTimeout(() => {
        fetchJobs(userEmail, UserRole);
        window.location.reload();
      }, 100);
    });
  };

  const ComplateJob = (id) => {
    complateTheJob(id).then((res) => {
      setTimeout(() => {
        fetchJobs(userEmail, UserRole);
        window.location.reload();
      }, 100);
    });
  };

  const deleteJob = () => {
    deleteTheJob(job.id, UserRole).then((res) => {
      setTimeout(() => {
        fetchJobs(UserRole, userEmail).then((res) => {
          dispatch(setMyJobs(res.data));
          window.location.reload();
        });
      }, 500);
    });
  };

  return (
    <div>
      <Card
        extra={
          userEmail === job.email && (
            <div
              onClick={() => {
                deleteJob();
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
      <Modal
        title="Update job"
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
      <Modal
        title="Info"
        open={openModalInfo}
        onCancel={() => {
          setOpenModalInfo(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Input
          placeholder="Info"
          onChange={(e) => setApplyJobInfo(e.target.value)}
          size="large"
        />
        <Button
          type="primary"
          onClick={() => {
            Apply();
          }}
          style={{
            margin: "10px",
          }}
        >
          Apply
        </Button>
      </Modal>
    </div>
  );
}

export default CardTable;
