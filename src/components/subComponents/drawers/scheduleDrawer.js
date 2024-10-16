import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { DatePicker, TimePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ScheduleDrawer({ open, userObj, onClose, edit, refreshData }) {
  const [userOpt, setUserOpt] = useState([]);
  const [user, setUser] = useState();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [title, setTitle] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    setUserOpt([userObj]);
    setUser(userObj);
  }, [open]);
  const handleDate = (value) => {
    setDate(value);
  };
  const handleAddDevice = (e) => {
    e.preventDefault();
    const dataObj = {
      date,
      startTime: startTime,
      endTime: endTime,
      title: title.value,
    };
    axios
      .post(`${apiPath.prodPath}/api/users/addSchedule/${user.value}`, dataObj)
      .then((res) => {
        onClose();
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error occured while adding schedule",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Successfully added Schedule",
          });
        }
        refreshData();
        resetValues();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    resetValues();
    onClose();
  };
  const resetValues = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setUser("");
    setTitle("");
  };

  const titleOpt = [
    { label: "Scheduled", value: "Scheduled" },
    { label: "Day Off", value: "Day Off" },
    { label: "Sick", value: "Sick" },
    { label: "Vacation", value: "Vacation" },
    { label: "Leave Of Absence", value: "Leave Of Absence" },
    { label: "Bereavement Leave", value: "Bereavement Leave" },
  ];
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <p className="close-modal" onClick={handleClose}>
          &#10005;
        </p>
        <form onSubmit={handleAddDevice}>
          <div className="input-wrap">
            <label>Employee</label>
            <Select
              options={userOpt}
              value={user}
              onChange={(v) => setUser(v)}
              isDisabled={true}
            />
          </div>
          <div className="input-wrap">
            <label>Title</label>
            <Select
              options={titleOpt}
              value={title}
              onChange={(v) => setTitle(v)}
            />
          </div>
          <div className="input-wrap">
            <label>Date</label>
            <DatePicker
              id="datePicker-1"
              value={date}
              onChange={handleDate}
              locale={"en-US"}
            />
            {date !== "" ? (
              <p
                onClick={() => {
                  setDate("");
                  setDay("");
                }}
                className="clear-value"
              >
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>Start Time</label>
            <TimePicker
              id="datePicker-1"
              value={startTime}
              onChange={(value) => setStartTime(value)}
              locale={"en-US"}
            />
            {startTime !== "" ? (
              <p
                onClick={() => {
                  setStartTime("");
                }}
                className="clear-value"
              >
                Clear
              </p>
            ) : null}
          </div>
          <div className="input-wrap">
            <label>End Time</label>
            <TimePicker
              id="datePicker-1"
              value={endTime}
              onChange={(value) => setEndTime(value)}
              locale={"en-US"}
            />
            {startTime !== "" ? (
              <p
                onClick={() => {
                  setEndTime("");
                }}
                className="clear-value"
              >
                Clear
              </p>
            ) : null}
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Schedule" : "Add Schedule"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ScheduleDrawer;
