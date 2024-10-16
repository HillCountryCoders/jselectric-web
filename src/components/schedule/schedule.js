"use client";
import "./style.scss";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import ScheduleTable from "../subComponents/tables/scheduleTable";
function Schedule() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    refreshData();
  }, []);
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setLoading(false);

        setAllUsers(res.data.allUsers);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <section className="employee-wrap">
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Schedules</h2>
      </div>
      <ScheduleTable
        loading={loading}
        allUsers={allUsers}
        refreshData={refreshData}
      />
    </section>
  );
}

export default Schedule;
