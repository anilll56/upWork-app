import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import "./FindTalents.css";
import { getTheFreelancerJob } from "../../api/HandleApi";
import { useSelector } from "react-redux";
import AvailableJobsCont from "../../components/AvailableJobs/AvailableJobsCont";

function FindTalents() {
  const [clientJobs, SetClientJobs] = useState([]);
  const optionsNames = useSelector((state) => state.person.optionsNames);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const options = optionsNames.map((option) => {
    return {
      value: option,
      label: option,
    };
  });
  const filterByCategory = () => {
    // getTalentsByCategory(selectedItems).then((res) => {
    //   SetFreelancerJobs(res.data);
    // });
  };

  const stringSelectedItems = selectedItems.toString();
  const selectedItemNoSpace = stringSelectedItems.replace(/\s/g, "");
  useEffect(() => {
    getTheFreelancerJob().then((res) => {
      SetClientJobs(res.data);

      const cleanedJobs = res.data.map((job) => ({
        ...job,
        "work-type": job["work-type"].replace(/\s/g, ""),
      }));
      cleanedJobs.map((job) => console.log(job["work-type"], "ss"));
      const filteredJobs = cleanedJobs.filter((job) =>
        selectedItemNoSpace.includes(job["work-type"])
      );
      setFilteredJobs(filteredJobs);
    });
  }, [selectedItems]);
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
          jobs={filteredJobs.length > 0 ? filteredJobs : clientJobs}
        />
      </div>
    </div>
  );
}

export default FindTalents;
