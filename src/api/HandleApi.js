import axios from "axios";
import { toast } from "react-toastify";
const url = "http://127.0.0.1:8000/api";

const LoginUser = async (email, password, userType) => {
  await axios
    .post(`${url}/loginUser`, {
      email: email,
      password: password,
      userType: userType,
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      return response.data[0];
    })
    .catch((error) => {
      console.log(error);
    });
};

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
  return response.data;
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
const fetchJobs = async (userRole, userEmail) => {
  try {
    if (userRole === "freelancer") {
      const response = await getTheFreelancerJobByEmail(userEmail);
      console.log(response, "response.data");
      localStorage.setItem("Myjobs", JSON.stringify(response?.data));
      return response.data;
    } else if (userRole === "client") {
      const response = await getTheClientJobByEmail(userEmail);
      localStorage.setItem("Myjobs", JSON.stringify(response?.data));
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const ApplyJob = async (jobId, name, email, requesterInfo) => {
  const response = await axios.post(`${url}/applyForTheJob`, {
    jobId: jobId,
    name: name,
    email: email,
    requesterInfo: requesterInfo,
  });
  toast.success("Başvurunu yapılmıştır");
  return response.data;
};

const getPendingJobs = async (email, status) => {
  const response = await axios.get(`${url}/getPendingJobs`, {
    email: email,
    status: status,
  });
  return response.data;
};

const AcceptUserForTheJob = async (jobId) => {
  const response = await axios.post(`${url}/acceptUserForTheJob`, {
    id: jobId,
  });
  toast.success("Başvuru kabul edildi");
  return response.data;
};

const hireUserForTheJob = async (jobId, name, email) => {
  console.log(jobId, name, email);
  const response = await axios.post(`${url}/hireFreelancer`, {
    jobId: jobId,
    name: name,
    email: email,
  });
  toast.success("İşe alındı");
  return response.data;
};

const RejectUserForTheJob = async (jobId) => {
  const response = await axios.post(`${url}/rejectUserForTheJob`, {
    id: jobId,
  });
  toast.error("Başvuru reddedildi");
  return response.data;
};

const getAcceptedJobsForTheFreelancer = async (email, status) => {
  const response = await axios.post(`${url}/getEmployedFreelancersByEmail`, {
    email: email,
    status: status,
  });
  return response.data[0];
};

const updateUser = async (name, email, userType, talent, price) => {
  console.log(
    "name:",
    name,
    "email:",
    email,
    "talent:",
    userType,
    "updateUser22222",
    talent,
    "price:",
    price,
    "usertype:"
  );
  const response = await axios.post(`${url}/updateUser`, {
    name: name === undefined ? "" : name,
    email: email,
    talent: talent === "" ? null : talent,
    price: price === "" ? null : price,
    userType: userType,
  });
  return response.data;
};

const complateTheJob = async (jobId) => {
  const response = await axios.post(`${url}/complateTheJob`, {
    id: jobId,
  });
  alert("İş tamamlandı");
  return response.data;
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
  LoginUser,
  Logout,
  fetchJobs,
  ApplyJob,
  getPendingJobs,
  AcceptUserForTheJob,
  RejectUserForTheJob,
  getAcceptedJobsForTheFreelancer,
  updateUser,
  hireUserForTheJob,
  complateTheJob,
};
