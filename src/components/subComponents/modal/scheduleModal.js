import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import "./style.scss";
import moment from "moment";
import { Poppins } from "next/font/google";
import Select from "react-select";
import { DatePicker, TimePicker } from "react-rainbow-components";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { Scheduler } from "@aldabil/react-scheduler";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

function ScheduleModal({ schedules, userObj, refreshData, handleClose, open }) {
  const [drawer, setDrawer] = useState(false);
  const [userOpt, setUserOpt] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [edit, setEdit] = useState(false);
  const [eventObj, setEventObj] = useState("");
  useEffect(() => {
    setUserOpt([userObj]);
    setUser(userObj);
  }, []);

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const dataObj = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      title: title.value,
    };
    axios
      .post(`${apiPath.prodPath}/api/users/addSchedule/${user.value}`, dataObj)
      .then((res) => {
        handleClose();
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
  const resetValues = () => {
    startDate("");
    endDate("");
    setUser("");
    setTitle("");
  };
  let alteredSch =
    schedules &&
    schedules.map((i) => {
      return {
        event_id: i._id,
        title: `${i.title} - From ${i.startTime} to ${i.endTime}`,
        start: new Date(
          `${moment(i.date).format("YYYY/MM/DD")} ${i.startTime}`
        ),
        end: new Date(`${moment(i.date).format("YYYY/MM/DD")} ${i.endTime}`),
        color:
          i.title == "Scheduled"
            ? "#000000"
            : i.title == "Day Off"
            ? "#89CFF0"
            : i.title == "Sick"
            ? "#FF5733"
            : i.title == "Leave Of Absence"
            ? "#990f02"
            : i.title == "Bereavement Leave"
            ? "#BC544B"
            : "#0000FF",
      };
    });
  const handleDeleEvent = (id) => {
    axios
      .delete(
        `${apiPath.prodPath}/api/users/deleteSchedule/${userObj.value}&&${id}`
      )
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error deleting the schedule",
          });
        } else {
          refreshData();
          handleClose();
        }
      });
  };
  const editSchedule = (flagValue) => {
    if (flagValue) {
      Swal.fire({
        icon: "error",
        text: "Uneable to update the schedule",
      });
    } else {
      Swal.fire({
        icon: "success",
        text: "Successfully updated the schedule",
      });
      refreshData();
      handleClose();
    }
    // const dataObj = {
    //   date:moment(event.)
    // }
    // axios.post()
  };
  const storeEvent = (event) => {
    setEventObj(event);
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-inner">
        <div className="main-wrap">
          <p className="close-modal" onClick={handleClose}>
            &#10005;
          </p>
        </div>
        <div className="schedule-wrap">
          <form onSubmit={handleAddSchedule}>
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
                onChange={(value) => setDate(value)}
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
        <Scheduler
          view="month"
          events={alteredSch}
          onDelete={handleDeleEvent}
          onEventClick={storeEvent}
          customEditor={(props) => (
            <SchedulerEditor
              eventObj={eventObj}
              onConfirm={editSchedule}
              props={props}
              userId={user.value}
            />
          )}
        />
      </div>
    </Modal>
  );
}
function SchedulerEditor({ onConfirm, userId, eventObj, close, props }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    setDate(moment(eventObj.end).format("YYYY/MM/DD"));
    setStartTime(moment(eventObj.start).format("hh:mm"));
    setEndTime(moment(eventObj.end).format("hh:mm"));
    setTitle({ label: eventObj.title, value: eventObj.title });
  }, []);
  const handleDate = (value) => {
    setDate(value);
  };
  const titleOpt = [
    { label: "Scheduled", value: "Scheduled" },
    { label: "Day Off", value: "Day Off" },
    { label: "Sick", value: "Sick" },
    { label: "Vacation", value: "Vacation" },
    { label: "Leave Of Absence", value: "Leave Of Absence" },
    { label: "Bereavement Leave", value: "Bereavement Leave" },
  ];
  const handleEditSchedule = (event) => {
    event.preventDefault();
    const dataObj = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      id: eventObj.event_id,
      title: title.value,
    };
    axios
      .post(`${apiPath.prodPath}/api/users/editSchedule/${userId}`, dataObj)
      .then((res) => {
        onConfirm(res.data.error);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="custom-editor-wrap">
      <div className="main-wrap">
        <p className="close-modal" onClick={props.close}>
          &#10005;
        </p>
      </div>
      <form className="innerForm" onSubmit={handleEditSchedule}>
        <div className="input-wrap">
          <div className="input-wrap">
            <label>Title</label>
            <Select
              options={titleOpt}
              value={title}
              onChange={(v) => setTitle(v)}
            />
          </div>
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
            value={"Edit Schedule"}
          />
        </div>
      </form>
    </div>
  );
}
export default ScheduleModal;
