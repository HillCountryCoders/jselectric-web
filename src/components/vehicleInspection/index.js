"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import VehicleInspectionTable from "../subComponents/tables/vehicleInspectionTable";
// import VehiclesDrawer from "../subComponents/drawers/vehicleDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Vehicles() {
  // const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allVehicleInspection, setAllVehicleInspection] = useState([]);
  const [usersOpt, setUsersOpt] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicleInspection/`)
      .then((res) => {
        setAllVehicleInspection(res.data.vehicleInspections);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    getEmployees();
  }, []);
  const getEmployees = async () => {
    await axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        const mappedUsers = res.data.allUsers.map((i) => {
          return { label: i.fullname, value: i.fullname };
        });
        setUsersOpt(mappedUsers);
      })
      .catch((error) => {
        console.log(error);
        setUsersOpt([]);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchFlag(true);
    const filterdInspection = allVehicleInspection.filter(
      (i) => i.employee == searchUser.value
    );
    setAllVehicleInspection(filterdInspection);
  };
  const clearSearch = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicleInspection/`)
      .then((res) => {
        setAllVehicleInspection(res.data.vehicleInspections);
        setLoading(false);
        setSearchFlag(false);
        setSearchUser("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Vehicle Inspections</h2>
        {/* <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Vehicles
        </button> */}
      </div>
      <div className="search-form-wrap">
        <form onSubmit={handleSearch}>
          <Select
            isDisabled={searchFlag}
            options={usersOpt}
            onChange={(v) => setSearchUser(v)}
            value={searchUser}
          />
          <input
            type="submit"
            value={"search"}
            className={`${poppins.className} search-btn`}
          />
        </form>
      </div>
      {searchFlag ? (
        <p className={`${poppins.className} clear-cus`} onClick={clearSearch}>
          Clear
        </p>
      ) : null}
      <div className="table-wrap">
        <VehicleInspectionTable
          loading={loading}
          allVehicleInspection={allVehicleInspection}
          // refreshData={refreshData}
        />
      </div>
      {/* <VehiclesDrawer
        addVehicle={addVehicle}
        open={drawer}
        onClose={handleCloseDrawer}
      /> */}
    </section>
  );
}

export default Vehicles;
