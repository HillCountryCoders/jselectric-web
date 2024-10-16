"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TimeTrackTable from "../subComponents/tables/timeTrackTable";
import TimeTrackDrawer from "../subComponents/drawers/timeTrackDrawer";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import jsPDF from "jspdf";
import "jspdf-autotable";
function TimeTrack() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeTrack, setTimeTrack] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [activeSpecFlag, setActiveSpecFlag] = useState(true);
  const [currentItem, setCurrentItem] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateFilter, setDateFilter] = useState(false);
  const [dateSearch, setDateSearch] = useState(false);
  const [searchSelect, setSearchSelect] = useState({
    label: "Employee",
    value: "Employee",
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeTrack/`)
      .then((res) => {
        setTimeTrack(res.data.timeTracks.filter((i) => i.spectrum == true));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const users = res.data.allUsers.map((i) => {
          return { label: i.fullname, value: i.fullname };
        });
        setAllUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dateFilter, dateSearch]);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  // const addEmp = (data) => {
  //   axios
  //     .post(`${apiPath.prodPath}/api/users/addUser`, data)
  //     .then((res) => {
  //       if (res.data && res.data.error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: "Error adding employee. The email used is already associated with another employee",
  //           timer: 1500,
  //         });
  //       }
  //       handleCloseDrawer();
  //       refreshData();
  //     })
  //     .catch((err) => console.log(err));
  // };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeTrack/`)
      .then((res) => {
        setTimeTrack(res.data.timeTracks);
        setActiveSpecFlag(activeSpecFlag);
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
    } else {
      var url = "";
      if (searchSelect.value == "Employee") {
        url = `${apiPath.prodPath}/api/timeTrack/${search.value}`;
      } else {
        url = `${apiPath.prodPath}/api/timeTrack/searchByJob/${search}`;
      }
    }
    axios
      .get(url)
      .then((res) => {
        setTimeTrack(res.data.timeTrack);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeTrack/`)
      .then((res) => {
        setTimeTrack(
          res.data.timeTracks.filter((i) => i.spectrum == activeSpecFlag)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setSearch("");
  };
  const editTimeTrackModal = (item) => {
    setCurrentItem(item);
    setDrawer(true);
  };
  // const specTrackData = timeTrack.filter((i) => i.spectrum == true);
  // const noSpecTrackData = timeTrack.filter((i) => i.spectrum == false);
  const editData = (data, id) => {
    axios.patch(`${apiPath.prodPath}/api/timeTrack/${id}`, data).then((res) => {
      if (res.data.error) {
        Swal.fire({
          icon: "error",
          text: "Uneable to edit",
        });
      } else {
        Swal.fire({
          icon: "success",
          text: "Edited Successfully",
          showConfirmButton: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            refreshData();
          }
        });
      }
    });
  };
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "striped",
      html: "#time-track-report",
      styles: { fontSize: 5 },
    });
    doc.save("report.pdf");
    setStartDate("");
    setEndDate("");
  };
  const handleDateSearch = () => {
    if (startDate !== "" && endDate !== "") {
      setLoading(true);
      axios
        .get(
          `${apiPath.prodPath}/api/timeTrack/?startDate=${startDate}&&endDate=${endDate}`
        )
        .then((res) => {
          setTimeTrack(res.data.timeTracks);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "Please Select both start and end Date",
      });
    }
  };
  const handleSpectrumTabs = (flag) => {
    setLoading(true);
    if (search == "") {
      axios
        .get(`${apiPath.prodPath}/api/timeTrack/`)
        .then((res) => {
          setTimeTrack(res.data.timeTracks.filter((i) => i.spectrum == flag));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      var url = "";
      if (searchSelect.value == "Employee") {
        url = `${apiPath.prodPath}/api/timeTrack/${search.value}`;
      } else {
        url = `${apiPath.prodPath}/api/timeTrack/searchByJob/${search}`;
      }
    }
    axios
      .get(url)
      .then((res) => {
        setTimeTrack(res.data.timeTrack.filter((i) => i.spectrum == flag));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const dateSearchRes = () => {
    if (startDate !== "" || endDate !== "") {
      setLoading(true);
      axios
        .get(
          `${apiPath.prodPath}/api/timeTrack/?startDate=${
            startDate == "" ? "" : startDate
          }&&endDate=${endDate == "" ? "" : endDate}`
        )
        .then((res) => {
          setTimeTrack(res.data.timeTracks);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "Please Select both start and end Date",
      });
    }
  };
  return (
    <section
      className={`${poppins.className} employee-wrap cus-timeTrack-wrap`}
    >
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Time Track</h2>
        {/* <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Employee
        </button> */}
        {dateFilter ? null : (
          <button className="dateFilterBtn" onClick={() => setDateFilter(true)}>
            Time Track Report
          </button>
        )}
      </div>
      <div className="search-wrap">
        <Select
          className={`${poppins.className} employee-names`}
          options={[
            { label: "Employee", value: "Employee" },
            { label: "Job Description", value: "Job Description" },
          ]}
          placeholder="Select Employee"
          value={searchSelect}
          onChange={(e) => setSearchSelect(e)}
        />
        <form onSubmit={handleSearch}>
          {searchSelect.value == "Employee" ? (
            <Select
              className={`${poppins.className} employee-names`}
              options={allUsers}
              placeholder="Select Employee"
              value={search}
              onChange={(e) => setSearch(e)}
            />
          ) : (
            <input
              type="text"
              placeholder="Search By job Description"
              value={search}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value);
              }}
            />
          )}
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
      </div>
      <button
        onClick={() => {
          setDateSearch(true);
          setDateFilter(false);
        }}
        className={`${poppins.className} btn-search-date`}
      >
        Date Filters
      </button>
      {dateSearch ? (
        <div className="date-filter">
          <div className="close-date">
            <span
              onClick={() => {
                refreshData();
                setDateSearch(false);
              }}
            >
              &#10005;
            </span>
          </div>
          <div className="input-wraps">
            <div className="cus-date-inp">
              <label className={poppins.className}>Start Date</label>
              <DatePicker
                id="datePicker-1"
                selected={startDate}
                onChange={(value) => setStartDate(value)}
              />
            </div>
            <div className="cus-date-inp">
              <label className={poppins.className}>End Date</label>
              <DatePicker
                id="datePicker-1"
                selected={endDate}
                onChange={(value) => setEndDate(value)}
              />
            </div>
            <button className={poppins.className} onClick={dateSearchRes}>
              Search
            </button>
          </div>
        </div>
      ) : null}
      {dateFilter ? (
        <div className="date-filter">
          <div className="close-date">
            <span
              onClick={() => {
                refreshData();
                setDateFilter(false);
              }}
            >
              &#10005;
            </span>
          </div>
          <div className="input-wraps">
            <div className="cus-date-inp">
              <label className={poppins.className}>Start Date</label>
              <DatePicker
                id="datePicker-1"
                selected={startDate}
                onChange={(value) => setStartDate(value)}
              />
            </div>
            <div className="cus-date-inp">
              <label className={poppins.className}>End Date</label>
              <DatePicker
                id="datePicker-1"
                selected={endDate}
                onChange={(value) => setEndDate(value)}
              />
            </div>
            <button className={poppins.className} onClick={handleDateSearch}>
              Search
            </button>
          </div>
          <button onClick={downloadPDF}>Generate Report</button>
        </div>
      ) : null}
      <div className="table-wrap">
        {/* <p>table comes here</p> */}
        <span
          onClick={() => {
            setActiveSpecFlag(true);
            handleSpectrumTabs(true);
          }}
          className={`${poppins.className} ${
            activeSpecFlag ? "activeSpec simpleSpec" : "simpleSpec"
          }`}
        >
          Spectrum
        </span>
        <span
          onClick={() => {
            setActiveSpecFlag(false);
            handleSpectrumTabs(false);
          }}
          className={`${poppins.className} ${
            activeSpecFlag == false ? "activeSpec simpleSpec" : "simpleSpec"
          }`}
        >
          Non Spectrum
        </span>
        <TimeTrackTable
          loading={loading}
          allTimeTrack={timeTrack}
          refreshData={refreshData}
          handleEdit={editTimeTrackModal}
        />
      </div>

      <TimeTrackDrawer
        timeTrackData={currentItem}
        open={drawer}
        onClose={handleCloseDrawer}
        editTimeTrackData={editData}
      />
    </section>
  );
}

export default TimeTrack;
