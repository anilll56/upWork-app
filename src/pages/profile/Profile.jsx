import React, { useEffect, useState } from "react";
import "./profile.css";
import { Form, Input, Button, Select, Modal, Avatar } from "antd";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import AvailableJobsCont from "../../components/AvailableJobs/AvailableJobsCont";
import AddCardTable from "../../components/Card/AddCardTable";
import {
  getAcceptedJobsForTheFreelancer,
  updateUser,
  fetchJobs,
  getClientByEmail,
  getTheFreelancerJobByClientEmail,
} from "../../api/HandleApi";

function Profile() {
  const reduxUser = useSelector((state) => state.person.info);
  const userType = reduxUser?.user?.role;
  const userMail = reduxUser?.user?.email;
  const Myjobs = localStorage.getItem("Myjobs");
  const parsedDataMyJob = JSON.parse(Myjobs);
  const currentJobs = parsedDataMyJob?.filter(
    (job) => job["work-status"] === "available"
  );
  const [getAcceptedJobs, setGetAcceptedJobs] = useState([]);
  const [getHiredFreelancers, setGetHiredFreelancers] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [getCompletedJobs, setGetCompletedJobs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalInputValue, setModalInputValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const optionsNames = useSelector((state) => state.person.optionsNames);
  const options = optionsNames.map((option) => {
    return {
      value: option,
      label: option,
    };
  });
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [updateProfileInputs, setUpdateProfileInputs] = useState({
    name: reduxUser?.user?.name || "",
    price: reduxUser?.user?.price || "",
    skills: reduxUser?.user?.talent || [],
  });

  useEffect(() => {
    if (reduxUser?.user?.role === "client") {
      setGetAcceptedJobs(
        parsedDataMyJob?.filter((job) => job["work-status"] === "accepted")
      );
      setPendingJobs(
        parsedDataMyJob?.filter((job) => job["work-status"] === "pending")
      );
      setGetCompletedJobs(
        parsedDataMyJob?.filter((job) => job["work-status"] === "completed")
      );
      getTheFreelancerJobByClientEmail(userMail).then((res) => {
        const filteredJobs = res.data.filter(
          (job) => job["client-email"] === userMail
        );
        //  setGetAcceptedJobs([...getAcceptedJobs, ...filteredJobs])
        setGetHiredFreelancers(filteredJobs);
      });
    } else if (reduxUser?.user?.role === "freelancer") {
      getAcceptedJobsForTheFreelancer(reduxUser?.user?.email, "accepted").then(
        (res) => {
          setGetAcceptedJobs(res);
        }
      );
      getAcceptedJobsForTheFreelancer(reduxUser?.user?.email, "pending").then(
        (res) => {
          setPendingJobs(res);
        }
      );
    }
  }, [reduxUser]);

  const changePassword = () => {
    if (modalInputValue.newPassword !== modalInputValue.confirmPassword) {
      alert("passwords not match");
    } else {
      console.log(modalInputValue);
    }
  };
  const updateProfile = () => {
    if (reduxUser?.user?.role === "client") {
      updateUser(updateProfileInputs.name, userMail, userType).then((res) => {
        setTimeout(() => {
          fetchJobs(userMail, userType);
          window.location.reload();
          getClientByEmail(userMail).then((res) => {
            localStorage.setItem("user", JSON.stringify(res));
          });
        }, 1000);
      });
    } else if (reduxUser?.user?.role === "freelancer") {
      updateUser(updateProfileInputs.name, userMail, userType).then((res) => {
        setTimeout(() => {
          fetchJobs(userMail, userType);
          window.location.reload();
        }, 1000);
      });
    }
  };
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-left-side">
          <div className="profile-left-side-cont">
            <div className="profile-left-side-form">
              <div>
                <Avatar
                  size={64}
                  src={<AiOutlineUser color="#108a00" size={64} />}
                />
              </div>
              <div>
                <Form
                  name="basic"
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{}}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item label={"Name"} name={"Name"} valuePropName>
                    <Input
                      placeholder={reduxUser?.user?.name || ""}
                      onChange={(e) =>
                        setUpdateProfileInputs({
                          ...updateProfileInputs,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Item>

                  {reduxUser?.user?.role === "freelancer" && (
                    <>
                      <Form.Item label="Price" name="Price" valuePropName>
                        <Input
                          type="number"
                          placeholder={reduxUser?.user?.price}
                          onChange={(e) =>
                            setUpdateProfileInputs({
                              ...updateProfileInputs,
                              price: e.target.value,
                            })
                          }
                        />
                      </Form.Item>

                      <Form.Item label="Talent" name="Talent" valuePropName>
                        <Select
                          mode="multiple"
                          allowClear
                          style={{
                            width: "100%",
                          }}
                          placeholder="Please select"
                          options={options}
                          onChange={(value) => {
                            setUpdateProfileInputs({
                              ...updateProfileInputs,
                              skills: value,
                            });
                          }}
                        />
                      </Form.Item>
                    </>
                  )}
                  <Form.Item
                    wrapperCol={{
                      offset: 4,
                      span: 16,
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        updateProfile();
                      }}
                    >
                      Update
                    </Button>
                  </Form.Item>
                </Form>

                <div
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="profile-change-password"
                >
                  Change Password
                </div>
              </div>
            </div>
            <AddCardTable />
          </div>
        </div>

        <div className="profile-righth-side">
          <div className="profile-righth-side-container">
            {currentJobs && <AvailableJobsCont jobs={currentJobs} />}
          </div>
          <div className="profile-righth-side-container">
            {pendingJobs?.length > 0 && (
              <div>
                <div>Pending Jobs</div>
                <AvailableJobsCont jobs={pendingJobs} />
              </div>
            )}

            {getAcceptedJobs?.length > 0 && (
              <div>
                <div>My Applications</div>
                <AvailableJobsCont jobs={getAcceptedJobs} />
              </div>
            )}
            {getHiredFreelancers?.length > 0 && (
              <div>
                <div>Hired Freelancers Jobs</div>
                <AvailableJobsCont jobs={getHiredFreelancers} />
              </div>
            )}
            {getCompletedJobs?.length > 0 && (
              <div>
                <div>Completed Jobs</div>
                <AvailableJobsCont jobs={getCompletedJobs} />
              </div>
            )}
          </div>
        </div>
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
          <Input
            placeholder="Old Password"
            type="password"
            className="change-password-input"
            onChange={(e) => {
              setModalInputValue({
                ...modalInputValue,
                oldPassword: e.target.value,
              });
            }}
          />
          <Input
            placeholder="New Password"
            type="password"
            className="change-password-input"
            onChange={(e) => {
              setModalInputValue({
                ...modalInputValue,
                newPassword: e.target.value,
              });
            }}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            className="change-password-input"
            onChange={(e) => {
              setModalInputValue({
                ...modalInputValue,
                confirmPassword: e.target.value,
              });
            }}
          />
          <Button
            type="primary"
            className="change-password-input"
            onClick={() => {
              changePassword();
            }}
          >
            Update
          </Button>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
