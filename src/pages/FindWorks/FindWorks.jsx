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
  const stringSelectedItems = selectedItems.toString();
  const selectedItemNoSpace = stringSelectedItems.replace(/\s/g, "");

  useEffect(() => {
    getClientJobs().then((res) => {
      const freelancerJobs = res.data;
      SetFreelancerJobs(freelancerJobs);

      // İş-tipi (work-type) değerlerini temizle ve karşılaştır
      const cleanedFreelancerJobs = freelancerJobs.map((job) => ({
        ...job,
        "work-type": job["work-type"].replace(/\s/g, ""),
      }));

      const filteredJobs = cleanedFreelancerJobs.filter((job) =>
        selectedItemNoSpace.includes(job["work-type"])
      );

      setFilteredJobs(filteredJobs);
    });
  }, [selectedItems]);
  return (
    <div className="find-talent-page">
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
