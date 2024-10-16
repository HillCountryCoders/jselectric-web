import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function JobDrawer({ open, onClose, addJob, editJob, id, edit, data }) {
  const [jobType, setJobType] = useState("");
  const [jobTypeOpt, setJobTypeOpt] = useState("");
  const [clientsOpt, setClientsOpt] = useState("");
  const [client, setClient] = useState("");
  const [jobId, setJobId] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/jobType`)
      .then((res) => {
        setJobTypeOpt(
          res.data.jobTypes.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setClientsOpt(
          res.data.clients.map((i) => ({
            label: i.customerName,
            value: i.customerName,
          }))
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      setClient({ label: data.client, value: data.client });
      setJobId(data.jobId);
      setJobType({ label: data.jobType, value: data.jobType });
    }
  }, []);

  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      jobType: jobType.value,
      jobId,
      client: client.value,
    };
    if (edit) {
      editJob(dataObj, id);
    } else {
      addJob(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setJobType("");
    setClient("");
    setJobId("");
  };
  const jobTypeHandler = (e) => setJobType(e);
  const clientHandler = (e) => setClient(e);
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <p className="close-modal" onClick={onClose}>
          &#10005;
        </p>
        <form onSubmit={handleaddJob}>
          <div className="input-wrap">
            <label>Job Type</label>
            <Select
              options={jobTypeOpt}
              onChange={jobTypeHandler}
              id="example-select-1"
              value={jobType}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Job ID</label>
            <input
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Client</label>
            <Select
              options={clientsOpt}
              onChange={clientHandler}
              id="example-select-1"
              value={client}
              className={poppins.className}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Job" : "Add Job"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default JobDrawer;
