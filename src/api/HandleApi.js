import axios from "axios";
const url = "http://127.0.0.1:8000/api";

const LoginfreelancerUser = async (email, password) => {
  const response = await axios.post(`${url}/freelancerUserlogin`, {
    email: email,
    password: password,
  });
  if (response.data) {
    debugger;
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
    debugger;
    localStorage.setItem("token", response.data.token);
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

export { LoginfreelancerUser, SignupfreelancerUser, SignupClientUserRegister };
