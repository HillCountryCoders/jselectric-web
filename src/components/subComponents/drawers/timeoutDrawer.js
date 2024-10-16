import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
function TimeoutDrawer({
  open,
  onClose,
  id,
  editFlag,
  data,
  refreshData,
  user,
}) {
  const [dateAdded, setDateAdded] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );
  const [addedBy, setAddedBy] = useState("");
  const [timeoutReasonOpt, setTimeoutReasonOpt] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [jamieFlag, setJamieFlag] = useState(false);
  const [managementFlag, setManagementFlag] = useState(false);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/timeoutReason/`)
      .then((res) => {
        const optionArr = res.data.timeoutReasons.map((i) => {
          return { label: i.name, value: i.name };
        });
        setTimeoutReasonOpt(optionArr);
      })
      .catch((error) => console.log(error));
    if (editFlag == false) {
      setAddedBy(user.fullname);
    }
    if (editFlag == false) {
      setStatus("Pending");
    }
    if (editFlag) {
      setAddedBy(data.user);
      setJamieFlag(data.jamieFlag);
      setManagementFlag(data.managementFlag);
      setReason({ label: data.reason, value: data.reason });
      setDateAdded(data.dateAdded);
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
    }
  }, [open]);
  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      user: addedBy,
      reason: reason.value,
      dateAdded: moment(dateAdded).format("MM-DD-YYYY"),
      startDate: moment(startDate).format("MM-DD-YYYY"),
      endDate: moment(endDate).format("MM-DD-YYYY"),
      status,
      jamieFlag,
      managementFlag,
    };
    if (editFlag) {
      axios
        .patch(`${apiPath.prodPath}/api/timeout/${id}`, dataObj)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Error Occurred While Editing Timeout",
            });
          } else {
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${apiPath.prodPath}/api/timeout/addTimeout`, dataObj)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Error Occurred While adding Timeout",
            });
          } else {
            dataEntryRefresh();
            refreshData();
            onClose();
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const dataEntryRefresh = () => {
    setAddedBy("");
    setReason("");
    setStartDate("");
    setEndDate("");
    setJamieFlag("");
    setManagementFlag("");
    setStatus("");
  };
  const today = new Date();
  const daysAfter20Days = new Date(new Date().setDate(today.getDate() + 20));
  const handleSubmitManagement = (e) => {
    setManagementFlag(e.target.checked);
  };
  const handleSubmitJamie = (e) => {
    setJamieFlag(e.target.checked);
  };
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
            <label>Date Added</label>
            <input type="text" disabled={true} value={dateAdded} />
          </div>
          <div className="input-wrap">
            <label>User</label>
            <input type="text" disabled={true} value={addedBy} />
          </div>
          <div className="input-wrap">
            <label>Start Date</label>
            <p>Must be 2 weeks or more in advance</p>
            <DatePicker
              selected={startDate}
              selectsStart={true}
              onChange={(date) => setStartDate(date)}
              minDate={daysAfter20Days}
            />
          </div>
          {startDate == "" ? null : (
            <div className="input-wrap">
              <label>End Date</label>
              <DatePicker
                selected={endDate}
                startDate={startDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd={true}
                minDate={startDate}
              />
            </div>
          )}
          <div className="input-wrap">
            <label>Reason</label>
            <Select
              options={timeoutReasonOpt}
              value={reason}
              onChange={(v) => setReason(v)}
              required={true}
            />
          </div>
          <div className="input-wrap">
            <label>Status</label>
            <input type="text" disabled={true} value={status} />
          </div>

          <div className="input-wrap">
            <FormControlLabel
              control={
                <Checkbox
                  checked={jamieFlag}
                  onChange={handleSubmitJamie}
                  inputProps={{ "aria-label": "controlled" }}
                  value={"jamie"}
                />
              }
              label="Submit to Jamie"
            />
          </div>
          <div className="input-wrap">
            <FormControlLabel
              control={
                <Checkbox
                  checked={managementFlag}
                  onChange={handleSubmitManagement}
                  inputProps={{ "aria-label": "controlled" }}
                  value={"management"}
                  label="Submit"
                />
              }
              label="Submit to Management"
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={editFlag ? "Edit Timeout" : "Add Timeout"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TimeoutDrawer;
