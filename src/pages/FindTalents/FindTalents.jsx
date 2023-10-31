import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import "./FindTalents.css";
import { getTheFreelancerJob } from "../../api/HandleApi";
import { useSelector } from "react-redux";
import AvailableJobsCont from "../../components/AvailableJobs/AvailableJobsCont";

function FindTalents() {
  const [clientJobs, SetClientJobs] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const optionsNames = useSelector((state) => state.person.person.optionsNames);
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
  useEffect(() => {
    getTheFreelancerJob().then((res) => {
      SetClientJobs(res.data);
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
        <AvailableJobsCont jobs={clientJobs} />
      </div>
    </div>
  );
}

export default FindTalents;
