import React, { useEffect, useState } from "react";
import "./AvailableJobs.css";
import { Row, Col } from "antd";
import CardTable from "../Card/CardTable";

function AvailableJobsCont({ jobs }) {
  console.log(jobs, "AvailableJobs");
  return (
    <Row gutter={16}>
      {jobs.map((job) => {
        return (
          <Col span={8} key={job.id}>
            <CardTable job={job} />
          </Col>
        );
      })}
    </Row>
  );
}

export default AvailableJobsCont;
