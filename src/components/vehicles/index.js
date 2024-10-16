"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import VehiclesTable from "../subComponents/tables/vehicleTable";
import VehiclesDrawer from "../subComponents/drawers/vehicleDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Vehicles() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allVehicles, setAllVehicles] = useState([]);
  const [activeLinks, setActiveLinks] = useState("Active");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        const filteredStatus = res.data.vehicles.filter(
          (i) => i.status == activeLinks
        );
        setAllVehicles(filteredStatus);
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
  const addVehicle = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/vehicles/addVehicle`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        const filteredStatus = res.data.vehicles.filter(
          (i) => i.status == activeLinks
        );
        setAllVehicles(filteredStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleLinks = (link) => {
    setActiveLinks(link);
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        const filteredStatus = res.data.vehicles.filter(
          (i) => i.status == link
        );
        setAllVehicles(filteredStatus);
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
        <h2 className={poppins.className}>Vehicles</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Vehicles
        </button>
      </div>
      <div className="active-links-wrap">
        <span
          className={
            activeLinks == "Active"
              ? `${poppins.className} active`
              : `${poppins.className} link`
          }
          onClick={() => handleLinks("Active")}
        >
          Active
        </span>
        <span
          className={
            activeLinks == "Inactive"
              ? `${poppins.className} active`
              : `${poppins.className} link`
          }
          onClick={() => handleLinks("Inactive")}
        >
          Inactive
        </span>
      </div>
      <div className="table-wrap">
        <VehiclesTable
          loading={loading}
          allVehicles={allVehicles}
          refreshData={refreshData}
        />
      </div>
      <VehiclesDrawer
        addVehicle={addVehicle}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Vehicles;
