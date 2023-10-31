import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
const url = "http://127.0.0.1:8000/api";

const LoginfreelancerUser = async (email, password) => {
  const response = await axios.post(`${url}/freelancerUserlogin`, {
    email: email,
    password: password,
    remember: true,
  });
  if (response.data) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data[0]));
    return response.data[0];
  }
};
const LoginClientUser = async (email, password) => {
  const response = await axios.post(`${url}/clienUserLogin`, {
    email: email,
    password: password,
    remember: true,
  });
  if (response.data) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data[0]));
    localStorage.setItem("Myjobs", JSON.stringify(response.data[1]));
    return response.data[0];
  }
};
const SignupfreelancerUser = async (name, email, password, talent, price) => {
  const response = await axios.post(`${url}/freelancerUserRegister`, {
    name: name,
    email: email,
    password: password,
    talent: talent,
    price: price,
  });
  if (response.data) {
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data[0]));
    localStorage.setItem("jobs", JSON.stringify(response.data[1]));
    return response;
  }
};

const SignupClientUser = async (name, email, password) => {
  const response = await axios.post(`${url}/clientUserRegister`, {
    name: name,
    email: email,
    password: password,
  });
  if (response.data) {
    console.log("başarıyla kayıt oldunuz");
    alert("başarıyla kayıt oldunuz");
    return response.data[0];
  }
};

const Logout = async () => {
  const response = await axios.post(`${url}/logout`);
  return response.data;
};
const getTheFreelancerJob = async () => {
  const response = await axios.get(`${url}/getTheFreelancerJob`);
  return response.data;
};

const getClientJobs = async () => {
  const response = await axios.get(`${url}/getTheClientJob`);
  return response.data;
};
const getTheClientJobByEmail = async (email) => {
  try {
    const response = await axios.post(`${url}/getTheClientJobByEmail`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Hata oluştu:", error);
    throw error;
  }
};
const getTheFreelancerJobByEmail = async (email) => {
  try {
    const response = await axios.post(`${url}/getTheFreelancerJobByEmail`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Hata Detayı:", error.message);
    console.error("Response Detayı:", error.response);
    throw error;
  }
};

const getTheFreelancerJobFilter = async (filter) => {
  const response = await axios.post(`${url}/getTheFreelancerJobFilter`, {
    filter: filter,
  });
  return response.data;
};

const updateTheFreelancerJob = async (
  id,
  jobTitle,
  email,
  jobDetails,
  jobTalents,
  jobPrice
) => {
  const response = await axios.post(`${url}/updateFreelancerWork`, {
    id: id,
    name: jobTitle || "",
    email: email || "",
    "work-type": jobTalents || "",
    "work-description": jobDetails || "",
    "work-price": jobPrice || "",
  });
  return console.log(
    response.data,
    "response.data",
    "id",
    id,
    "title",
    jobTitle,
    "email",
    email,
    "details",
    jobDetails,
    "talents",
    jobTalents,
    "price",
    jobPrice
  );
};

const AddClientJob = async (
  jobTitle,
  email,
  jobDetails,
  jobTalents,
  jobPrice
) => {
  const response = await axios.post(`${url}/OpenClientWork`, {
    name: jobTitle,
    email: email,
    "work-type": jobTalents,
    "work-description": jobDetails,
    "work-price": jobPrice,
  });
  if (response.data) {
    return response.data;
  } else {
    console.log("error");
  }
};
const updateTheClientJob = async (
  id,
  jobTitle,
  email,
  jobDetails,
  jobTalents,
  jobPrice
) => {
  const response = await axios.post(`${url}/updateClientWork`, {
    id: id,
    name: jobTitle || "",
    email: email || "",
    "work-type": jobTalents || "",
    "work-description": jobDetails || "",
    "work-price": jobPrice || "",
  });
  return response.data;
};

const deleteTheJob = async (id, jobType) => {
  if (jobType === "freelancer") {
    const response = await axios.post(`${url}/deleteFreelancerWork`, {
      id: id,
    });
    return response.data;
  } else if (jobType === "client") {
    const response = await axios.post(`${url}/deleteClientWork`, {
      id: id,
    });
    return response.data;
  }
};
const addFreelancerJob = async (
  jobTitle,
  email,
  jobDetails,
  jobTalents,
  jobPrice
) => {
  const response = await axios.post(`${url}/openFreelancerWork`, {
    name: jobTitle,
    email: email,
    "work-type": jobTalents,
    "work-description": jobDetails,
    "work-price": jobPrice,
  });
  if (response.data) {
    return response.data;
  } else {
    console.log("error");
  }
};

export {
  LoginfreelancerUser,
  SignupfreelancerUser,
  SignupClientUser,
  getClientJobs,
  getTheFreelancerJob,
  LoginClientUser,
  AddClientJob,
  getTheClientJobByEmail,
  getTheFreelancerJobFilter,
  updateTheFreelancerJob,
  updateTheClientJob,
  deleteTheJob,
  addFreelancerJob,
  getTheFreelancerJobByEmail,
};
