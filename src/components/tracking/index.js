"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TrackingTable from "../subComponents/tables/trackingTable";
import TrackingDrawer from "../subComponents/drawers/trackingDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function TrackingComp() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTracking, setAllTracking] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tracking/`)
      .then((res) => {
        setAllTracking(res.data.trackings);
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
  const addTracking = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/tracking/addTracking`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tracking/`)
      .then((res) => {
        setAllTracking(res.data.trackings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  console.log("###", allTracking);
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Tracking</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Tracking
        </button>
      </div>
      <div className="table-wrap">
        <TrackingTable
          loading={loading}
          allTracking={allTracking}
          refreshData={refreshData}
        />
      </div>
      {loading ? null : drawer ? (
        <TrackingDrawer
          addTracking={addTracking}
          open={drawer}
          onClose={handleCloseDrawer}
          edit={false}
          allTracking={allTracking}
        />
      ) : null}
    </section>
  );
}

export default TrackingComp;
