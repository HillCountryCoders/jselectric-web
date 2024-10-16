"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TaskNotificationTable from "../subComponents/tables/taskNotificationTable";
// import TimeTrackDrawer from "../subComponents/drawers/timeTrackDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});

function TaskNotification({ user }) {
  const [loading, setLoading] = useState(false);
  const [taskNotification, setTaskNotification] = useState([]);
  const [activeLinkFlag, setActiveLinkFlag] = useState("Assigned By");
  useEffect(() => {
    getTasks();
    const taskInterval = setInterval(() => {
      getTasks();
    }, 60000);
    return () => {
      clearInterval(taskInterval);
    };
  }, [activeLinkFlag, user]);
  const getTasks = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task`)
      .then((res) => {
        setLoading(false);
        const sortedByDate = res.data.allTasks.sort((a, b) =>
          a.lastUpdated.localeCompare(b.lastUpdated)
        );
        setTaskNotification(sortedByDate);
      })
      .catch((err) => console.log(err));
  };
  const taskAssignedByMe =
    taskNotification &&
    user !== null &&
    user.userInfo !== undefined &&
    taskNotification.filter((i) => i.user == user.userInfo.fullname);
  var taskAssignedToMe = [];
  taskNotification.forEach((element) => {
    element.assignedTo.forEach((innerEl) => {
      if (user !== null && innerEl.fullname == user.userInfo.fullname) {
        taskAssignedToMe = [element, ...taskAssignedToMe];
        return taskAssignedToMe;
      }
    });
  });
  return (
    <section className={`${poppins.className}`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Task Notifications</h2>
      </div>
      {/* <div className="search-wrap">
        <form onSubmit={handleSearch}>
          <Select
            className={poppins.className}
            options={allUsers}
            placeholder="Select Employee"
            value={search}
            onChange={(e) => setSearch(e)}
          />
          <input
            className={`${poppins.className} search-btn`}
            type="submit"
            value={"Search"}
          />
          {search == "" ? null : (
            <p
              onClick={handleClear}
              className={`${poppins.className} clear-btn`}
              style={{ color: "red" }}
            >
              Clear
            </p>
          )}
        </form>
      </div> */}
      <div className="table-wrap">
        <span
          onClick={() => setActiveLinkFlag("Assigned By")}
          className={`${poppins.className} ${
            activeLinkFlag == "Assigned By"
              ? "activeSpec simpleSpec"
              : "simpleSpec"
          }`}
        >
          Assigned By
        </span>
        <span
          onClick={() => setActiveLinkFlag("Assigned To")}
          className={`${poppins.className} ${
            activeLinkFlag == "Assigned To"
              ? "activeSpec simpleSpec"
              : "simpleSpec"
          }`}
        >
          Assigned To
        </span>
        {loading ? (
          <p className={poppins.className}>Loading....</p>
        ) : (
          <TaskNotificationTable
            loading={loading}
            allTasks={
              activeLinkFlag == "Assigned By"
                ? taskAssignedByMe
                : taskAssignedToMe
            }
          />
        )}
      </div>
    </section>
  );
}

export default TaskNotification;
