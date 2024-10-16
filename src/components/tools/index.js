"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import ToolsTable from "../subComponents/tables/toolsTable";
import ToolsDrawer from "../subComponents/drawers/toolsDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import * as XLSX from "xlsx";

function Tools() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [allTools, setAllTools] = useState([]);
  const [search, setSearch] = useState("");
  const [activeLinks, setActiveLinks] = useState("Active");
  const [searchOpt, setSearchOpt] = useState({
    label: "Serial No",
    value: "serialNo",
  });
  var filteredData = [];
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools);
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
  const addTool = (data, cb = null) => {
    axios
      .post(`${apiPath.prodPath}/api/tools/addTools`, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: `${res.data.message}`,
          });
        } else {
          handleCloseDrawer();
          refreshData();
          cb();
        }
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    if (search == "") {
      return false;
    }
    axios
      .get(`${apiPath.prodPath}/api/tools/${search}&&${searchOpt.value}`)
      .then((res) => {
        setAllTools(res.data.allTools);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools);
        setLoading(false);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const generateReport = () => {
    var mappedData = [];
    allTools.forEach((i) => {
      if (i.history.length) {
        mappedData = [
          {
            tool: i.toolNumber,
            category: i.category,
            subCategory: i.subCategory,
            description: i.description,
            techAssigned: i.techAssigned,
            checkedOut: i.history[i.history.length - 1].checkedOut,
            assignedOnDate: i.history[i.history.length - 1].date,
            dueDate: moment(
              addDays(
                new Date(i.history[i.history.length - 1].date),
                i.history[i.history.length - 1].checkedOut
              )
            ).format("MM-DD-YYYY"),
          },
          ...mappedData,
        ];
      }
      // i.history.forEach((his) => {
      //   mappedData = [
      //     {
      //       tool: i.toolNumber,
      //       category: i.category,
      //       subCategory: i.subCategory,
      //       description: i.description,
      //       techAssigned: i.techAssigned,
      //       checkedOut: his.checkedOut,
      //       assignedOnDate: his.date,
      //       dueDate: moment(addDays(new Date(his.date), his.checkedOut)).format(
      //         "MM-DD-YYYY"
      //       ),
      //     },
      //     ...mappedData,
      //   ];
      // });
    });
    console.log("this is mapped data", mappedData);
    try {
      setLoadingFile(true);
      // Create Excel workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils?.json_to_sheet(mappedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "tool track report");
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `toolTrackReport.xlsx`);
      console.log(`Exported data to toolTrackReport.xlsx`);
      setLoadingFile(false);
    } catch (error) {
      setLoadingFile(false);
      console.log("#==================Export Error", error.message);
    }
  };
  function addDays(date, days) {
    if (days == "" || days == undefined || days == "undefined") {
      return "";
    } else {
      const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
      return newDate;
    }
  }
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Tools</h2>
        <div className="tools-wrap-upper">
          <button
            onClick={() => setDrawer(true)}
            className={`${poppins.className} btn-add`}
          >
            Add Tools
          </button>
          <button
            onClick={() => generateReport()}
            className={`${poppins.className} btn-add`}
          >
            {loadingFile ? "Processing..." : "Generate Report"}
          </button>
        </div>
      </div>
      <div className="search-opt">
        <Select
          className={poppins.className}
          value={searchOpt}
          id="tools-filter-cus"
          options={[
            { label: "Serial No", value: "serialNo" },
            { label: "Tool No", value: "toolNo" },
            { label: "Description", value: "description" },
            { label: "Tech Assigned", value: "techAssigned" },
            { label: "Location", value: "location" },
          ]}
          onChange={(value) => {
            setSearchOpt(value);
            setSearch("");
          }}
        />
      </div>
      {searchOpt.value == "toolNo" ? (
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Tool#"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className={`${poppins.className} search-btn`}
              type="submit"
              value={"Search"}
              disabled={search == "" ? true : false}
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
        </div>
      ) : null}
      {searchOpt.value == "serialNo" ? (
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Serial #"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className={`${poppins.className} search-btn`}
              type="submit"
              value={"Search"}
              disabled={search == "" ? true : false}
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
        </div>
      ) : null}
      {searchOpt.value == "description" ? (
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className={`${poppins.className} search-btn`}
              type="submit"
              value={"Search"}
              disabled={search == "" ? true : false}
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
        </div>
      ) : null}
      {searchOpt.value == "techAssigned" ? (
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Tech Assigned"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className={`${poppins.className} search-btn`}
              type="submit"
              value={"Search"}
              disabled={search == "" ? true : false}
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
        </div>
      ) : null}
      {searchOpt.value == "location" ? (
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className={`${poppins.className} search-btn`}
              type="submit"
              value={"Search"}
              disabled={search == "" ? true : false}
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
        </div>
      ) : null}
      <div className="table-wrap">
        <div className="active-links-wrap">
          <span
            className={
              activeLinks == "Active"
                ? `${poppins.className} active`
                : `${poppins.className} link`
            }
            onClick={() => setActiveLinks("Active")}
          >
            Active
          </span>
          <span
            className={
              activeLinks == "Inactive-Broken"
                ? `${poppins.className} active`
                : `${poppins.className} link`
            }
            onClick={() => setActiveLinks("Inactive-Broken")}
          >
            Inactive-Broken
          </span>
        </div>
        <ToolsTable
          loading={loading}
          allTools={allTools.filter((i) => i.status == activeLinks)}
          refreshData={refreshData}
        />
      </div>
      <ToolsDrawer
        addTool={addTool}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Tools;
