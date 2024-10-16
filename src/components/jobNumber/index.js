"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import JobNumberTable from "../subComponents/tables/jobNumberTable";
import JobNumberDrawer from "../subComponents/drawers/jobNumberDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function JobNumber() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allJobNumbers, setAllJobNumbers] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [jobTagOpt, setJobTagOpt] = useState("");
  const [clientsOpt, setClientsOpt] = useState("");
  const [jobPMOpt, setJobPMOpt] = useState("");
  const [searchForm, setSearchForm] = useState({
    jobTag: "",
    jobPM: "",
    client: "",
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        setAllJobNumbers(res.data.jobNumbers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setClientsOpt(
          res.data.clients.map((i) => ({
            label: i.customerName,
            value: i.customerName,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/jobTag`)
      .then((res) => {
        setJobTagOpt(
          res.data.jobTags.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/jobPM`)
      .then((res) => {
        setJobPMOpt(
          res.data.jobPMs.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addJobNumber = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/jobNumber/addJobNumber`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
    axios
      .post(`${apiPath.prodPath}/api/sheetsData/addSingleJob`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        setAllJobNumbers(res.data.jobNumbers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleJobTag = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        jobTag: value,
      };
    });
  };
  const handleJobPM = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        jobPM: value,
      };
    });
  };
  const handleClient = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        client: value,
      };
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `${apiPath.prodPath}/api/jobNumber/?jobTag=${
          searchForm.jobTag.value == undefined ? "" : searchForm.jobTag.value
        }&jobPM=${
          searchForm.jobPM == "" ? "" : searchForm.jobPM.value
        }&client=${searchForm.client == "" ? "" : searchForm.client.value}`
      )
      .then((res) => {
        setAllJobNumbers(res.data.jobNumbers);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleClear = () => {
    setSearchForm({
      jobTag: "",
      jobPM: "",
    });
    refreshData();
  };
  const handleSync = () => {
    axios.get(`${apiPath.prodPath}/api/sheetsData/`).then((res) => {
      if (res.data.error) {
        Swal.fire({
          icon: "error",
          text: `${res.data.message}`,
        });
      } else {
        Swal.fire({
          icon: "success",
          text: `${res.data.message}`,
        });
        refreshData();
      }
    });
  };
  const handleSyncTo = () => {
    axios
      .post(`${apiPath.prodPath}/api/sheetsData/addDataToSheet/`, {
        data: allJobNumbers,
      })
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: `${res.data.message}`,
          });
        } else {
          Swal.fire({
            icon: "success",
            text: `${res.data.message}`,
          });
          refreshData();
        }
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Job Numbers</h2>
        <div className="btn-wraps">
          <button
            onClick={() => setDrawer(true)}
            className={`${poppins.className} btn-add`}
          >
            Add Job Number
          </button>
          <button
            onClick={handleSync}
            className={`${poppins.className} btn-add`}
          >
            Sync From Google Sheet
          </button>
          <button
            onClick={handleSyncTo}
            className={`${poppins.className} btn-add`}
          >
            Sync To Google Sheet
          </button>
        </div>
      </div>
      {filterFlag ? null : (
        <span
          className={`${poppins.className} filter-btn`}
          onClick={() => setFilterFlag(true)}
        >
          Filters
        </span>
      )}
      {filterFlag ? (
        <div className="filters-wrap">
          <p
            className="close-icon"
            onClick={() => setFilterFlag(false)}
            style={{ textAlign: "right", marginBottom: "10px" }}
          >
            &#10005;
          </p>
          <form onSubmit={handleSearch}>
            <Select
              className={`${poppins.className} taskOpt-cus`}
              options={jobTagOpt}
              placeholder="Job Tag"
              onChange={handleJobTag}
              value={searchForm.jobTag}
            />
            <Select
              className={`${poppins.className} taskOpt-cus`}
              options={jobPMOpt}
              placeholder="Job PM"
              onChange={handleJobPM}
              value={searchForm.jobPM}
            />
            <Select
              className={`${poppins.className} taskOpt-cus`}
              options={clientsOpt}
              placeholder="Client"
              onChange={handleClient}
              value={searchForm.client}
            />
            <input
              type="submit"
              className={`${poppins.className} search-btn`}
              value={"Search"}
            />
          </form>
          {searchForm.jobTag !== "" || searchForm.jobPM !== "" ? (
            <p
              onClick={handleClear}
              className={`${poppins.className} filter-btn`}
            >
              Clear Filter
            </p>
          ) : null}
          <p></p>
        </div>
      ) : null}
      <div className="table-wrap">
        <JobNumberTable
          loading={loading}
          allJobNumbers={allJobNumbers}
          refreshData={refreshData}
        />
      </div>
      <JobNumberDrawer
        addJobNumber={addJobNumber}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default JobNumber;
