import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { getClientJobs, getTheFreelancerJob } from "../../api/HandleApi";
import AvailableJobsCont from "../../components/AvailableJobs/AvailableJobsCont";

function HomePage() {
  const [Clientjobs, SetClientJobs] = useState([]);
  const [freelancerJobs, SetFreelancerJobs] = useState([]);
  useEffect(() => {
    getClientJobs().then((res) => {
      SetClientJobs(res.data);
    });
    getTheFreelancerJob().then((res) => {
      SetFreelancerJobs(res.data);
    });
  }, []);

  return (
    <div>
      <div className="home-jobs-title ">Aviable Jobs for freelancer user</div>
      <AvailableJobsCont jobs={Clientjobs} />
      <div className="home-jobs-title ">Aviable Freelancer User</div>
      <AvailableJobsCont jobs={freelancerJobs} />
    </div>
  );
}

export default HomePage;
