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
function JobNumberDrawer({
  open,
  onClose,
  addJobNumber,
  editJob,
  id,
  edit,
  data,
}) {
  // const [jobTag, setJobTag] = useState("");
  // const [jobTagOpt, setJobTagOpt] = useState("");
  // const [jobPMOpt, setJobPMOpt] = useState("");
  const [jobCTMOpt, setJobCTMOpt] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [jobPM, setJobPM] = useState("");
  const [jobName, setJobName] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dateBilled, setDateBilled] = useState("");
  const [jobCTM, setJobCTM] = useState("");
  const [amount, setAmount] = useState("");
  const [POContract, setPOContract] = useState("");
  const [changeOrder, setChangeOrder] = useState("");
  const [percentageBilled, setPercentageBilled] = useState("");
  const [notes, setNotes] = useState("");
  const [userOpt, setUserOpt] = useState("");
  const [client, setClient] = useState("");
  const [gncOpt, setGncOpt] = useState([]);
  const [generalContractor, setGeneralContractor] = useState("");
  const [projectChecklist, setProjectChecklist] = useState("");
  useEffect(() => {
    // axios
    //   .get(`${apiPath.prodPath}/api/jobTag`)
    //   .then((res) => {
    //     setJobTagOpt(
    //       res.data.jobTags.map((i) => ({ label: i.name, value: i.name }))
    //     );
    //   })
    //   .catch((err) => console.log(err));
    // axios
    //   .get(`${apiPath.prodPath}/api/jobPM`)
    //   .then((res) => {
    //     setJobPMOpt(
    //       res.data.jobPMs.map((i) => ({ label: i.name, value: i.name }))
    //     );
    //   })
    //   .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/generalContract`)
      .then((res) => {
        setGncOpt(
          res.data.generalContracts.map((i) => ({
            label: i.companyName,
            value: i.companyName,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/jobCTM`)
      .then((res) => {
        setJobCTMOpt(
          res.data.jobCTMs.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const sortedUser = res.data.allUsers
          .map((i) => ({
            label: i.fullname,
            value: i.fullname,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setUserOpt(sortedUser);
      })
      .catch((err) => console.log(err));
    if (edit) {
      setClient({ label: data.initials, value: data.initials });
      // setJobTag({ label: data.jobTag, value: data.jobTag });
      setJobNumber(data.jobNumber);
      setJobPM({ label: data.jobPM, value: data.jobPM });
      setGeneralContractor({
        label: data.generalContractor,
        value: data.generalContractor,
      });
      setJobName(data.jobName);
      setDateCreated(
        data.dateCreated == "" || data.dateCreated == undefined
          ? ""
          : new Date(data.dateCreated)
      );
      setDateBilled(
        data.dateBilled == "" || data.dateBilled == undefined
          ? ""
          : new Date(data.dateBilled)
      );
      setJobCTM({ label: data.contractTM, value: data.contractTM });
      setPOContract(data.PO);
      setChangeOrder(data.CO);
      setPercentageBilled(data.percentageBilled);
      setNotes(data.notes);
      setAmount(data.amount);
      setProjectChecklist(data.projectChecklist);
    }
  }, []);

  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      // jobTag: jobTag.value,
      jobNumber,
      jobPM: jobPM.value,
      jobName,
      initials: client.value,
      dateCreated:
        dateCreated == "" ? "" : moment(dateCreated).format("MM-DD-YYYY"),
      dateBilled:
        dateBilled == "" ? "" : moment(dateBilled).format("MM-DD-YYYY"),
      contractTM: jobCTM.value,
      amount,
      PO: POContract,
      CO: changeOrder,
      percentageBilled,
      notes,
      generalContractor: generalContractor.value,
      projectChecklist,
    };
    if (edit) {
      editJob(dataObj, id);
    } else {
      addJobNumber(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    // setJobTag("");
    setAmount("");
    setChangeOrder("");
    setDateBilled("");
    setJobNumber("");
    setJobName("");
    setPOContract("");
    setPercentageBilled("");
    setNotes("");
    setJobCTM("");
    setJobPM("");
    setDateCreated("");
    setClient("");
    setGeneralContractor("");
    setProjectChecklist("");
  };
  const jobTagHandler = (e) => setJobTag(e);
  const jobPMHandler = (e) => setJobPM(e);
  const jobCTMHandler = (e) => setJobCTM(e);
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
          {/* <div className="input-wrap">
            <label>Job Tag</label>
            <Select
              options={jobTagOpt}
              onChange={jobTagHandler}
              id="example-select-1"
              value={jobTag}
              className={poppins.className}
            />
          </div> */}
          <div className="input-wrap">
            <label>Job Number</label>
            <input
              type="text"
              value={jobNumber}
              onChange={(e) => setJobNumber(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Job PM</label>
            <Select
              options={userOpt}
              onChange={jobPMHandler}
              id="job-select-1"
              value={jobPM}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Job Name</label>
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Initials</label>
            <Select
              options={userOpt}
              onChange={clientHandler}
              id="job-select-2"
              value={client}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>General Contractor</label>
            <Select
              options={gncOpt}
              onChange={(v) => setGeneralContractor(v)}
              id="job-select-3"
              value={generalContractor}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Date Created</label>
            <DatePicker
              selected={dateCreated}
              onChange={(date) => setDateCreated(date)}
            />
            {dateCreated == "" ? null : (
              <p onClick={() => setDateCreated("")}>Clear</p>
            )}
          </div>
          <div className="input-wrap">
            <label>Date Billed</label>
            <DatePicker
              selected={dateBilled}
              onChange={(date) => setDateBilled(date)}
            />
            {dateBilled == "" ? null : (
              <p onClick={() => setDateBilled("")}>Clear</p>
            )}
          </div>
          <div className="input-wrap">
            <label>Contract / TM</label>
            <Select
              options={jobCTMOpt}
              onChange={jobCTMHandler}
              id="job-select-4"
              value={jobCTM}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Amount</label>
            <input
              placeholder="$"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>PO</label>
            <input
              type="text"
              value={POContract}
              onChange={(e) => setPOContract(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>CO</label>
            <input
              type="text"
              value={changeOrder}
              onChange={(e) => setChangeOrder(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Percentage Billed</label>
            <input
              placeholder="%"
              type="number"
              value={percentageBilled}
              onChange={(e) => setPercentageBilled(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={poppins.className}
            />
          </div>
          <div className="input-wrap">
            <label>Project Checklist</label>
            <input
              type="text"
              value={projectChecklist}
              onChange={(e) => setProjectChecklist(e.target.value)}
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

export default JobNumberDrawer;
