import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { getClientJobs, getTheFreelancerJob } from "../../api/HandleApi";
import AvailableJobsCont from "../../components/AvailableJobs/AvailableJobsCont";

function HomePage() {
  const [clientjobs, setClientJobs] = useState([]);
  const [freelancerJobs, setFreelancerJobs] = useState([]);
  useEffect(() => {
    getClientJobs().then((res) => {
      setClientJobs(res.data);
    });
    getTheFreelancerJob().then((res) => {
      setFreelancerJobs(res.data);
    });
  }, []);

  return (
    <div>
      {clientjobs.length > 0 && (
        <div>
          <div className="home-jobs-title ">
            Aviable Jobs for freelancer user
          </div>
          <div className="home-card-cont">
            <AvailableJobsCont jobs={clientjobs} />
          </div>
        </div>
      )}
      {freelancerJobs.length > 0 && (
        <div>
          <div className="home-jobs-title ">Aviable Freelancer User</div>
          <div className="home-card-cont">
            <AvailableJobsCont jobs={freelancerJobs} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
