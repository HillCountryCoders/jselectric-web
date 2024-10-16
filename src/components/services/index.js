"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import ServiceTable from "../subComponents/tables/servicesTable";
import ServiceDrawer from "../subComponents/drawers/serviceDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function ServicesComp({ currentUser }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [salesTaxValue, setSalesTaxValue] = useState();
  const [activeLinks, setActiveLinks] = useState("Open Ticket");
  const [loaderOuter, setLoaderOuter] = useState(false);
  const [employeeOpt, setEmployeeOpt] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  useEffect(() => {
    console.log("called");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/service/`)
      .then((res) => {
        setAllServices(res.data.services);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    axios.get(`${apiPath.prodPath}/api/globalTax/`).then((res) => {
      setSalesTaxValue(res.data.globalTaxs[0].taxValue);
      setLoading(false);
    });
    axios.get(`${apiPath.prodPath}/api/users/`).then((res) => {
      const empArr = res.data.allUsers.map((i) => {
        return { label: i.fullname, value: i.fullname };
      });
      setEmployeeOpt(empArr);
      setLoading(false);
    });
  }, []);
  const handleCloseDrawer = () => {
    console.log("clicked");
    setDrawer(!drawer);
  };
  const addServices = (data) => {
    setLoaderOuter(true);
    axios
      .post(`${apiPath.prodPath}/api/service/addService`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
        setLoaderOuter(false);
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/service/`)
      .then((res) => {
        setAllServices(res.data.services);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSearch = (e) => {
    setSearchFlag(true);
    e.preventDefault();
    const filteredResults = allServices.filter(
      (i) => i.orderTakenBy == employee.value
    );
    setAllServices(filteredResults);
  };
  const handleClear = () => {
    setEmployee("");
    setSearchFlag(false);
    refreshData();
  };
  const filteredData =
    activeLinks == "Billed"
      ? allServices.filter((i) => i.ticketStatus == "Billed")
      : activeLinks == "Unbilled"
      ? allServices.filter((i) => i.ticketStatus == "Unbilled")
      : activeLinks == "Open Ticket"
      ? allServices.filter((i) => i.ticketStatus == "Open Ticket")
      : allServices;
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Service Tickets</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Ticket
        </button>
      </div>
      <div className="form-wrap">
        <form onSubmit={handleSearch}>
          <Select
            placeholder="Search Employee"
            value={employee}
            options={employeeOpt}
            onChange={(v) => setEmployee(v)}
          />
          {searchFlag ? <button onClick={handleClear}>Clear</button> : null}
          <input type="submit" value={"Search"} />
        </form>
      </div>
      <div className="table-wrap">
        <div className="active-links-wrap">
          <span
            className={
              activeLinks == "Open Ticket"
                ? `${poppins.className} active`
                : `${poppins.className} link`
            }
            onClick={() => setActiveLinks("Open Ticket")}
          >
            Open Ticket
          </span>
          <span
            className={
              activeLinks == "Unbilled"
                ? `${poppins.className} active`
                : `${poppins.className} link`
            }
            onClick={() => setActiveLinks("Unbilled")}
          >
            Unbilled
          </span>
          <span
            className={
              activeLinks == "Billed"
                ? `${poppins.className} active`
                : `${poppins.className} link`
            }
            onClick={() => setActiveLinks("Billed")}
          >
            Billed
          </span>
        </div>
        <ServiceTable
          loading={loading}
          allServices={filteredData}
          refreshData={refreshData}
          currentUser={currentUser}
          salesTaxValue={salesTaxValue}
        />
      </div>
      {loading ? null : drawer ? (
        <ServiceDrawer
          addServices={addServices}
          open={drawer}
          onClose={handleCloseDrawer}
          edit={false}
          allServices={filteredData}
          currentUser={currentUser}
          salesTaxValue={salesTaxValue}
          loaderOuter={loaderOuter}
        />
      ) : null}
    </section>
  );
}

export default ServicesComp;
