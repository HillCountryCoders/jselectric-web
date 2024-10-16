import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import moment from "moment";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function WriteUpDrawer({
  open,
  onClose,
  id,
  editFlag,
  data,
  refreshData,
  user,
}) {
  const [dateCreated, setDateCrearted] = useState(
    editFlag ? data.dateCreated : new Date()
  );
  const [dateAdded, setDateAdded] = useState("");
  const [createdBy, setCreartedBy] = useState(
    user !== undefined && user !== null ? user.fullname : ""
  );
  const [empOpt, setEmpOpt] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [typeOfWarning, setTypeOfWarning] = useState("");
  const [typeOfOffences, setTypeOfOffences] = useState([]);
  const [otherOffence, setOtherOffence] = useState("");
  const [description, setDescription] = useState("");
  const [warningOpt, setWarningOpt] = useState("");
  const [offenceOpt, setOffenceOpt] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/warning/`)
      .then((res) => {
        setWarningOpt(
          res.data.warnings.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/offence/`)
      .then((res) => {
        setOffenceOpt(
          res.data.offences.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const users = res.data.allUsers
          .map((i) => {
            return { label: i.fullname, value: i.fullname };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setEmpOpt(users);
      })
      .catch((error) => console.log(error));
    if (editFlag) {
      console.log("this is edit data", data);
      setCreartedBy(data.createdBy);
      setEmployeeName({ label: data.employeeName, value: data.employeeName });
      setTypeOfWarning({
        label: data.typeOfWarning,
        value: data.typeOfWarning,
      });
      const TOffence = data.typeOfOffences.length
        ? data.typeOfOffences.map((i) => {
            return { label: i, value: i };
          })
        : [];
      console.log("TP edit", TOffence);
      setTypeOfOffences(TOffence);
      setOtherOffence(
        data.typeOfOffences.length
          ? data.typeOfOffences.includes("Others")
            ? data.otherOffence
            : ""
          : ""
      );
      setDateAdded(data.dateAdded);
      setDescription(data.description);
    }
  }, [open]);
  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      dateCreated: moment(dateCreated).format("MM-DD-YYYY"),
      createdBy: createdBy,
      employeeName: employeeName.value,
      dateAdded: dateAdded !== "" ? moment(dateAdded).format("MM-DD-YYYY") : "",
      typeOfWarning: typeOfWarning.value,
      typeOfOffences: typeOfOffences.map((i) => i.value),
      otherOffence: typeOfOffences.length
        ? typeOfOffences.map((i) => i.value).includes("Others")
          ? otherOffence
          : ""
        : "",
      description,
    };
    if (editFlag) {
      axios
        .patch(`${apiPath.prodPath}/api/writeUp/${id}`, dataObj)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Error Editing the Write Up",
            });
          } else {
            Swal.fire({
              icon: "success",
              text: "Edited Successfully",
            });
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        })
        .catch((err) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: "Error Editing the Write Up",
          });
        });
    } else {
      axios
        .post(`${apiPath.prodPath}/api/writeUp/addWriteUp`, dataObj)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Error Adding the Write Up",
            });
          } else {
            Swal.fire({
              icon: "success",
              text: "Added Successfully",
            });
            const dataWriteUp = {
              createdBy: createdBy,
              employeeName: employeeName.value,
            };
            if (window && window !== undefined) {
              fetch(`${window.location.origin}/api/newWriteUp`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ dataWriteUp }),
              })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
            }
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        })
        .catch((err) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: "Error Adding the Write Up",
          });
        });
    }
  };
  const dataEntryRefresh = () => {
    setDateAdded("");
    setEmployeeName("");
    setDescription("");
    setTypeOfWarning("");
    setTypeOfOffences([]);
    setOtherOffence("");
  };

  console.log(typeOfOffences);
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} innerDrawerCon`}>
        <p className="close-modal" onClick={onClose}>
          &#10005;
        </p>
        <form onSubmit={handleaddJob}>
          <div className="input-wrap">
            <label>Date Created</label>
            <DatePicker selected={dateCreated} disabled={true} />
          </div>
          <div className="input-wrap">
            <label>Created By</label>
            <input type="text" value={createdBy} disabled={true} />
          </div>
          <div className="input-wrap">
            <label>Employee</label>
            <Select
              id="job-select-1"
              options={empOpt}
              value={employeeName}
              onChange={(v) => setEmployeeName(v)}
            />
          </div>
          <div className="input-wrap">
            <label>Date Added</label>
            <DatePicker
              selected={dateAdded}
              onChange={(date) => setDateAdded(date)}
            />
          </div>
          <div className="input-wrap">
            <label>Warnings</label>
            <Select
              id="job-select-2"
              options={warningOpt}
              value={typeOfWarning}
              onChange={(v) => setTypeOfWarning(v)}
            />
          </div>
          <div className="input-wrap">
            <label>Type Of Offences</label>
            <Select
              id="job-select-3"
              isMulti={true}
              options={offenceOpt}
              value={typeOfOffences}
              onChange={(v) => {
                setTypeOfOffences(v);
              }}
            />
          </div>
          {typeOfOffences.length
            ? typeOfOffences.map((inner) => {
                if (inner.value == "Others") {
                  return (
                    <div key={inner} className="input-wrap">
                      <label>Others:</label>
                      <input
                        type="text"
                        value={otherOffence}
                        onChange={(e) => setOtherOffence(e.target.value)}
                      />
                    </div>
                  );
                }
              })
            : null}
          <div className="input-wrap">
            <label>Description</label>
            <textarea
              rows={5}
              cols={5}
              className={poppins.className}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={editFlag ? "Edit Write Up" : "Add Write Up"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default WriteUpDrawer;
