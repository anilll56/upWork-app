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

const SignupfreelancerUser = async (name, email, password, talent, price) => {
  const response = await axios.post(`${url}/freelancerUserRegister`, {
    name: name,
    email: email,
    password: password,
    talent: talent,
    price: price,
  });
  if (response.data) {
    console.log("başarıyla kayıt oldunuz");
    localStorage.setItem("user", JSON.stringify(response.data[0]));
    return response.data[0];
  }
};

const SignupClientUserRegister = async (name, email, password) => {
  const response = await axios.post(`${url}/clientUserRegister`, {
    name: name,
    email: email,
    password: password,
  });
  return response.data[0];
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

const getTheFreelancerJobFilter = async (filter) => {
  const response = await axios.post(`${url}/getTheFreelancerJobFilter`, {
    filter: filter,
  });
  return response.data;
};

export {
  LoginfreelancerUser,
  SignupfreelancerUser,
  SignupClientUserRegister,
  getClientJobs,
  getTheFreelancerJob,
};
