import React, { useEffect, useState } from "react";
import "./AvailableJobs.css";
import { Row, Col } from "antd";
import CardTable from "../Card/CardTable";
import AddCardTable from "../Card/AddCardTable";
import { getClientJobs } from "../../api/HandleApi";

function AvailableJobsCont({ jobs }) {
  console.log(jobs, "AvailableJobs");
  return (
    <Row gutter={16}>
      <div className="available-jobs-container">
        {jobs.map((job) => {
          return (
            <Col span={5} key={1}>
              <CardTable job={job} />
            </Col>
          );
        })}
      </div>
    </Row>
  );
}

export default AvailableJobsCont;
