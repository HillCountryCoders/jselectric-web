"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import EmployeeTable from "../subComponents/tables/employeeTable";
import EmployeeDrawer from "../subComponents/drawers/employeeDrawer";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Employees() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userStatusLink, setUserStatusLink] = useState("Active");
  const [searchSelect, setSearchSelect] = useState({
    label: "Name",
    value: "name",
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const usersFiltered = res.data.allUsers.filter(
          (i) => i.userStatus == "Active"
        );
        setAllUsers(usersFiltered);
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
  const addEmp = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/users/addUser`, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error adding employee. The email used is already associated with another employee",
            timer: 1500,
          });
        }
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const usersFiltered = res.data.allUsers.filter(
          (i) => i.userStatus == "Active"
        );
        setAllUsers(usersFiltered);
        setUserStatusLink("Active");
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
    var url = "";
    if (search == "") {
      return false;
    } else if (searchSelect.value == "name") {
      url = `${apiPath.prodPath}/api/users/${search}`;
    } else {
      url = `${apiPath.prodPath}/api/users/search/${search}`;
    }
    axios
      .get(url)
      .then((res) => {
        var usersFiltered = res.data.allUsers.filter(
          (i) => i.userStatus == userStatusLink
        );
        setAllUsers(usersFiltered);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        var usersFiltered = res.data.allUsers.filter(
          (i) => i.userStatus == userStatusLink
        );
        setAllUsers(usersFiltered);
        setLoading(false);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleActiveUsers = (e) => {
    getUsersAccToStatus(e.target.innerText);
    setUserStatusLink(e.target.innerText);
  };
  const getUsersAccToStatus = (statusText) => {
    console.log("here", statusText);
    setLoading(true);
    if (search !== "") {
      console.log("in this search");
      var url = "";
      if (searchSelect.value == "name") {
        url = `${apiPath.prodPath}/api/users/${search}`;
      } else {
        url = `${apiPath.prodPath}/api/users/search/${search}`;
      }
      console.log("url", url);
      axios
        .get(url)
        .then((res) => {
          console.log(res);
          var usersFiltered = res.data.allUsers.filter(
            (i) => i.userStatus == statusText
          );
          setAllUsers(usersFiltered);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      axios
        .get(`${apiPath.prodPath}/api/users/`)
        .then((res) => {
          var usersFiltered = res.data.allUsers.filter(
            (i) => i.userStatus == statusText
          );
          var userFilteredOnSearch = [];
          if (search !== "") {
            userFilteredOnSearch = usersFiltered.filter(
              (i) => i.fullname == search
            );
            setAllUsers(userFilteredOnSearch);
            setLoading(false);
          } else {
            setAllUsers(usersFiltered);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <section className={`${poppins.className} employee-wrap cus-emp-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>Employees</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add Employee
        </button>
      </div>
      <Select
        options={[
          { label: "Name", value: "name" },
          { label: "Position", value: "position" },
        ]}
        value={searchSelect}
        onChange={(v) => setSearchSelect(v)}
      />
      <div className="search-wrap">
        <form onSubmit={handleSearch}>
          <input
            className={poppins.className}
            type="text"
            placeholder={
              searchSelect.value == "name"
                ? "Search by Name"
                : "Search By Position"
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
      <div className="table-wrap">
        <div className="super-task-wrap">
          <span
            className={
              userStatusLink == "Active"
                ? `${poppins.className} activeSuper`
                : `${poppins.className} simpleSuper`
            }
            onClick={handleActiveUsers}
          >
            Active
          </span>
          <span
            className={
              userStatusLink == "Inactive"
                ? `${poppins.className} activeSuper`
                : `${poppins.className} simpleSuper`
            }
            onClick={handleActiveUsers}
          >
            Inactive
          </span>
        </div>
      </div>
      <div className="table-wrap">
        <EmployeeTable
          loading={loading}
          allUsers={allUsers}
          refreshData={refreshData}
        />
      </div>
      <EmployeeDrawer
        addEmp={addEmp}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Employees;
