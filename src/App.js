import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthenticated, setPerson, setMyJobs } from "./redux/personSlice";

import RoutePage from "./route/RoutePage";
import {
  getTheClientJobByEmail,
  getTheFreelancerJobByEmail,
} from "./api/HandleApi";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const userEmail = JSON.parse(user)?.email;
  const userRole = JSON.parse(user)?.role;
  const authenticated = useSelector((state) => state.person.authenticated);

  const fetchJobs = async () => {
    try {
      if (userRole === "freelancer") {
        const response = await getTheFreelancerJobByEmail(userEmail);
        console.log(response, "response.data");
        localStorage.setItem("Myjobs", JSON.stringify(response.data));
      } else if (userRole === "client") {
        const response = await getTheClientJobByEmail(userEmail);
        localStorage.setItem("Myjobs", JSON.stringify(response.data));
        dispatch(setMyJobs(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchJobs();
    if (user) {
      dispatch(setPerson({ user: user }));
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setPerson({ user: null }));
      console.log("kullanıcı yok");
      dispatch(setAuthenticated(false));
      navigate("/login");
    }
  }, [authenticated, userRole, userEmail, dispatch]);

  return (
    <div className="App">
      <RoutePage />
    </div>
  );
}

export default App;
