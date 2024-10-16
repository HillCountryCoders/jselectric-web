import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function JobEstimateDrawer({
  open,
  onClose,
  addJobEstimate,
  editJobEstimate,
  id,
  edit,
  data,
  allJobEstimates,
}) {
  const [RFQId, setRFQId] = useState("");
  const [estimateId, setEstimateId] = useState("");
  const [approvalId, setApprovalId] = useState("");
  const [handOffId, setHandOffId] = useState("");
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState("");
  const [active, setActive] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [generalContractor, setGeneralContractor] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [attachments, setAttachments] = useState("");
  const [clientsOpt, setClientOpt] = useState("");
  const [generalContractorOpt, setGeneralContractorOpt] = useState("");
  const [sourceOpt, setSourceOpt] = useState("");
  const [statusOpt, setStatusOpt] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const [oldFile, setOldFile] = useState("");
  const [pictureUpload, setPictureUpload] = useState("");
  useEffect(() => {
    console.log("edit", edit, allJobEstimates.length);
    if (edit == false) {
      if (allJobEstimates.length < 1) {
        var RFQ_ID = `QUOTE-${moment().format("YYYY")}-1`;
        setRFQId(RFQ_ID);
      }
    }
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setClientOpt(
          res.data.clients.map((i) => ({
            label: i.customerName,
            value: i.customerName,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/generalContract/`)
      .then((res) => {
        setGeneralContractorOpt(
          res.data.generalContracts.map((i) => ({
            label: i.companyName,
            value: i.companyName,
            ...i,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/jobStatus/`)
      .then((res) => {
        setStatusOpt(
          res.data.jobStatus.map((i) => ({
            label: i.name,
            value: i.name,
            ...i,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/jobSources/`)
      .then((res) => {
        setSourceOpt(
          res.data.jobSources.map((i) => ({
            label: i.name,
            value: i.name,
            ...i,
          }))
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
    }
  }, [open]);
  const handleStatus = (e) => {
    setStatus(e);
    if (e.value == "RFQ/RFP") {
      if (allJobEstimates.length < 1) {
        var RFQ_ID = `QUOTE-${moment().format("YYYY")}-1`;
        setRFQId(RFQ_ID);
        setEstimateId("");
        setJobId("");
        setHandOffId("");
        setApprovalId("");
      }
    }
    if (e.value == "Estimate") {
      if (allJobEstimates.length < 1) {
        var RFQ_ID = `QUOTE-${moment().format("YYYY")}-1`;
        var EST_ID = `EST-${moment().format("YYYY")}-1`;
        setRFQId(RFQ_ID);
        setEstimateId(EST_ID);
        setJobId("");
        setHandOffId("");
        setApprovalId("");
      }
    }
    if (e.value == "Job") {
      if (allJobEstimates.length < 1) {
        var RFQ_ID = `QUOTE-${moment().format("YYYY")}-1`;
        var EST_ID = `EST-${moment().format("YYYY")}-1`;
        var EST_ID = `EST-${moment().format("YYYY")}-1`;
        setRFQId(RFQ_ID);
        setEstimateId(EST_ID);
        setJobId("");
        setHandOffId("");
      }
    }
    if (e.value == "Approved") {
      setApprovalId("Approved");
    }
    if (e.value == "Handed Off") {
      setHandOffId("Handed Off ID");
    }
  };
  const fileHandler = (e) => {
    if (edit) {
      setNewFileFlag(true);
      setPictureUpload(e.target.files[0]);
    } else {
      setPictureUpload(e.target.files[0]);
    }
  };
  const handleadd = (e) => {
    e.preventDefault();
  };
  const dataEntryRefresh = () => {};

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
        <form onSubmit={handleadd}>
          <div className="input-wrap">
            <label>RFQ Id</label>
            <input type="text" name="RFQId" value={RFQId} disabled={true} />
          </div>
          <div className="input-wrap">
            <label>Estimate Id</label>
            <input
              type="text"
              name="estimateId"
              value={estimateId}
              disabled={true}
            />
          </div>
          <div className="input-wrap">
            <label>Approval Id</label>
            <input
              type="text"
              name="approvalId"
              value={approvalId}
              disabled={true}
            />
          </div>
          <div className="input-wrap">
            <label>Hand Off Id</label>
            <input
              type="text"
              name="handOffId"
              value={handOffId}
              disabled={true}
            />
          </div>
          <div className="input-wrap">
            <label>job Id</label>
            <input type="text" name="jobId" value={jobId} disabled={true} />
          </div>
          <div className="input-wrap">
            <label>Status</label>
            <Select
              options={statusOpt}
              onChange={handleStatus}
              id="example-select-1"
              value={status}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Active</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              onChange={(v) => setActive(v)}
              id="example-select-1"
              value={active}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Date</label>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
            {date == "" ? null : <p onClick={() => setDate("")}>Clear</p>}
          </div>
          <div className="input-wrap">
            <label>Source</label>
            <Select
              options={sourceOpt}
              onChange={(v) => setSource(v)}
              id="example-select-1"
              value={source}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>General Contractor</label>
            <Select
              options={generalContractorOpt}
              onChange={(v) => setGeneralContractor(v)}
              id="example-select-1"
              value={generalContractor}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Client</label>
            <Select
              options={clientsOpt}
              onChange={(v) => setClient(v)}
              id="example-select-1"
              value={client}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Due Date</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
            />
            {dueDate == "" ? null : <p onClick={() => setDueDate("")}>Clear</p>}
          </div>
          <div className="input-wrap">
            <label>Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label>Attachments</label>
            <input type="file" name="files" onChange={fileHandler} />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Job Estimate" : "Add Job Estimate"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default JobEstimateDrawer;
