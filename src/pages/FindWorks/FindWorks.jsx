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
  const optionsNames = useSelector((state) => state.person.person.optionsNames);
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
  useEffect(() => {
    getClientJobs().then((res) => {
      SetFreelancerJobs(res.data);
    });
  }, []);
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
        <AvailableJobsCont jobs={freelancerJobs} />
      </div>
    </div>
  );
}

export default FindWorks;
