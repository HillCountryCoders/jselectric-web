"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DevicesTable from "../subComponents/tables/deviceTable";
import DevicesDrawer from "../subComponents/drawers/deviceDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Devices() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allDevices, setAllDevices] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/devices/`)
      .then((res) => {
        setAllDevices(res.data.devices);
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
  const addDevice = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/devices/addDevice`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/devices/`)
      .then((res) => {
        setAllDevices(res.data.devices);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Devices</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Devices
        </button>
      </div>
      <div className="table-wrap">
        <DevicesTable
          loading={loading}
          allDevices={allDevices}
          refreshData={refreshData}
        />
      </div>
      <DevicesDrawer
        addDevice={addDevice}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Devices;
