import React from "react";
import "./FindWorks.css";
import { Select } from "antd";
import { useState, useEffect } from "react";
import { getClientJobs } from "../../api/HandleApi";
import { useSelector } from "react-redux";
import AvailableJobsCont from "../../components/AvailableJobs/AvailableJobsCont";

function FindWorks() {
  const [freelancerJobs, SetFreelancerJobs] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const optionsNames = useSelector((state) => state.person.optionsNames);
  const options = optionsNames.map((option) => {
    return {
      value: option,
      label: option,
    };
  });
  const filterByCategory = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };
  const stringSelectedItems = selectedItems.join(" ");
  useEffect(() => {
    getClientJobs().then((res) => {
      const freelancerJobs = res.data; // Assuming res.data contains the jobs
      SetFreelancerJobs(freelancerJobs);

      const stringSelectedItems = selectedItems.join("");

      const filteredJobs = freelancerJobs.filter((job) => {
        return stringSelectedItems.includes(job["work-type"]);
      });
      setFilteredJobs(filteredJobs);
    });
  }, [selectedItems]);
  console.log(selectedItems, "selectedItems");

  console.log(stringSelectedItems, "stringSelectedItems");
  console.log(filteredJobs, "filteredJobs");
  console.log(freelancerJobs, "freelancerJobs");
  return (
    <div>
      <div className="find-talent-input">
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "40%",
          }}
          placeholder="Please select"
          options={options}
          onChange={(value) => {
            setSelectedItems(value);
          }}
        />
      </div>
      <div className="find-talent-container">
        <AvailableJobsCont
          jobs={filteredJobs.length > 0 ? filteredJobs : freelancerJobs}
        />
      </div>
    </div>
  );
}

export default FindWorks;
