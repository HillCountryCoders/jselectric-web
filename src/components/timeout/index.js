"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TimeoutDrawer from "../subComponents/drawers/timeoutDrawer";
import TimeoutTable from "../subComponents/tables/timeoutTable";
import "./style.scss";
import axios from "axios";
import Select from "react-select";

import { apiPath } from "@/utils/routes";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function TimeOutComp({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeouts, settimeouts] = useState([]);
  const [superComp, setSuperComp] = useState("Approved");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter(i=> i.status == superComp));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter(i=> i.status == superComp));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleApproved = () => {
    setSuperComp("Approved")
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter(i=> i.status == "Approved"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  const handlePending = () => {
    setSuperComp("Pending")
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter(i=> i.status == "Pending"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  const handleRejected = () => {
    setSuperComp("Rejected")
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter(i=> i.status == "Rejected"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Timeouts</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Timeout
        </button>
      </div>
          <div className="super-task-wrap">
            <span
              className={
                superComp == "Approved"
                  ? `${poppins.className} activeSuper`
                  : `${poppins.className} simpleSuper`
              }
              onClick={handleApproved}
            >
              Approved
            </span>
            <span
              className={
                superComp == "Pending"
                  ? `${poppins.className} activeSuper`
                  : `${poppins.className} simpleSuper`
              }
              onClick={handlePending}
            >
              Pending
            </span>
            <span
              className={
                superComp == "Rejected"
                  ? `${poppins.className} activeSuper`
                  : `${poppins.className} simpleSuper`
              }
              onClick={handleRejected}
            >
              Rejected
            </span>
          </div>
        
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TimeoutTable
          loading={loading}
          refreshData={refreshData}
          data={timeouts}
        />
      )}
      <TimeoutDrawer
        refreshData={refreshData}
        open={drawer}
        onClose={handleCloseDrawer}
        editFlag={false}
        user={user}
      />
    </section>
  );
}

export default TimeOutComp;
