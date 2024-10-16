"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Poppins } from "next/font/google";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
const poppins = Poppins({
  weight: ["300", "400", "500", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import * as XLSX from "xlsx";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
var columns = [
  { field: "toolNumber", headerName: "Tool Number", width: 70 },
  { field: "techAssigned", headerName: "Tech Assigned", width: 130 },
  { field: "checkedOut", headerName: "Checked Out", width: 130 },
  {
    field: "note",
    headerName: "Notes",
    width: 130,
  },
  {
    field: "job",
    headerName: "Job",
    width: 100,
  },
  {
    field: "user",
    headerName: "Employee",
    width: 130,
  },
  {
    field: "location",
    headerName: "Location",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "time",
    headerName: "Time",
    width: 100,
  },
];
function HistoryTab({ history, toolsInfo }) {
  const [loading, setLoading] = useState(false);
  const [toolTrack, setToolTrack] = useState([]);
  const [checkboxArr, setCheckboxArr] = useState([]);
  const viewImage = (file) => {
    window.open(file.fileUrl);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/serviceToolTrack/`)
      .then((res) => {
        const filteredToolTrack = res.data.toolTracks.filter(
          (i) => i.toolNumber == toolsInfo.toolNumber
        );
        setToolTrack(filteredToolTrack);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const dateCalculator = (dateVal, checkedOut) => {
    var date = new Date(dateVal);
    date.setDate(date.getDate() + Number(checkedOut));
    var finalDate =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    var checkedOutDate = new Date(finalDate);
    var currentDate = new Date();
    var currentDateMS = currentDate.getTime();
    if (checkedOutDate.getTime() < currentDateMS) {
      return true;
    } else {
      return false;
    }
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/serviceToolTrack/`)
      .then((res) => {
        const filteredToolTrack = res.data.toolTracks.filter(
          (i) => i.toolNumber == toolsInfo.toolNumber
        );
        setToolTrack(filteredToolTrack);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const paginationModel = { page: 0, pageSize: 5 };
  // const generateReport = async () => {
  //   const mappedData = history.map((inner) => {
  //     return {
  //       tool: toolsInfo.toolNumber,
  //       category: toolsInfo.category,
  //       subCategory: toolsInfo.subCategory,
  //       description: toolsInfo.description,
  //       techAssigned: toolsInfo.techAssigned,
  //       checkedOut: inner.checkedOut,
  //       assignedOnDate: inner.date,
  //       dueDate: moment(addDays(new Date(inner.date), inner.checkedOut)).format(
  //         "MM-DD-YYYY"
  //       ),
  //     };
  //   });
  //   console.log("this is mapped data", mappedData);
  //   try {
  //     setLoading(true);
  //     // Create Excel workbook and worksheet
  //     const workbook = XLSX.utils.book_new();
  //     const worksheet = XLSX.utils?.json_to_sheet(mappedData);
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "tool track report");
  //     // Save the workbook as an Excel file
  //     XLSX.writeFile(workbook, `toolTrackReport.xlsx`);
  //     console.log(`Exported data to toolTrackReport.xlsx`);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("#==================Export Error", error.message);
  //   }
  // };
  // const addDays = (date, days) => {
  //   if (days == "" || days == undefined || days == "undefined") {
  //     return "";
  //   } else {
  //     console.log("#####", date.getDate());
  //     date.setDate(date.getDate() + days);
  //     return date;
  //   }
  // };
  // function addDays(date, days) {
  //   if (days == "" || days == undefined || days == "undefined") {
  //     return "";
  //   } else {
  //     const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     return newDate;
  //   }
  // }
  const handleCheckboxes = (value) => {
    setCheckboxArr(value);
  };
  const handleEdit = () => {
    console.log("edit", checkboxArr);
  };
  const handleDelete = () => {
    const id = checkboxArr[0];
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the record?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredData = toolTrack.find((i) => i.id == id);
        const oldFiles = JSON.stringify(filteredData.file);
        const dataObj = { data: oldFiles };
        axios
          .put(
            `${apiPath.prodPath}/api/serviceToolTrack/deleteToolTrack/${id}&&${filteredData.techAssigned}`,
            dataObj
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error Occured while deleting record",
              });
            } else {
              refreshData();
              setCheckboxArr([]);
            }
          });
      }
    });
  };
  const handleReturn = () => {
    const strCheckboxArr = JSON.stringify(checkboxArr);
    const bodyData = { data: strCheckboxArr };
    axios
      .patch(
        `${apiPath.prodPath}/api/serviceToolTrack/changeLocation/`,
        bodyData
      )
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: res.data.message,
          });
        } else {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          refreshData();
          setCheckboxArr([]);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleAttachment = () => {
    const id = checkboxArr[0];
    const filteredData = toolTrack.find((i) => i.id == id);
    console.log(filteredData);
    if (filteredData.file == undefined) {
      Swal.fire({
        icon: "error",
        text: "There is no attachment present against this record",
      });
    }
    viewImage(filteredData.file);
  };
  return loading ? (
    <p>Loading...</p>
  ) : (
    <section className="parts-wrap">
      {/* <div className="generate-btn-wrap">
        <button onClick={generateReport} className={poppins.className}>
          {loading ? "Processing..." : "Generate Report"}
        </button>
      </div> */}
      {/* {toolTrack.length > 0 ? (
        <section>
          {toolTrack.map((i) => (
            <div key={i.toolNumber} className="row-history">
              <div className="single-item">
                <label>Tool #</label>
                <p>{i.toolNumber}</p>
              </div>
              <div className="single-item">
                <label>Tech Assigned To</label>
                <p>{i.techAssigned}</p>
              </div>
              <div className="single-item">
                <label>Checked Out For</label>
                <p>
                  {i.checkedOut !== undefined && i.checkedOut !== "undefined"
                    ? i.checkedOut == ""
                      ? "none"
                      : `${i.checkedOut} days`
                    : "none"}
                </p>
              </div>
              <div className="single-item">
                <label>Notes</label>
                <p>{i.note}</p>
              </div>
              <div className="single-item">
                <label>Job</label>
                <p>{i.job}</p>
              </div>
              <div className="single-item">
                <label>Employee</label>
                <p>{i.user}</p>
              </div>
              <div className="single-item">
                <label>Location</label>
                <p>{i.location}</p>
              </div>
              <div className="single-item">
                <label>Date</label>
                <p>{i.date}</p>
              </div>
              <div className="single-item">
                <label>Time</label>
                <p>{i.time}</p>
              </div>
              <div className="single-item">
                <label>Attachment</label>
                <img
                  onClick={() => viewImage(i.file)}
                  src={i.file && i.file.fileUrl}
                  width={30}
                  height={30}
                  alt={i.file && i.file.filename}
                />
              </div>
            </div>
          ))}
        </section>
      ) : (
        <p>There is no history available for this tool</p>
      )} */}
      {checkboxArr.length == 0 ? null : (
        <div className="tool-track-act-btn-wrap">
          {/* {checkboxArr.length > 1 ? null : (
            <button
              onClick={handleEdit}
              disabled={checkboxArr.length > 1 ? true : false}
            >
              Edit
            </button>
          )} */}
          {checkboxArr.length > 1 ? null : (
            <button
              onClick={handleDelete}
              disabled={checkboxArr.length > 1 ? true : false}
            >
              Delete
            </button>
          )}
          {checkboxArr.length > 1 ? null : (
            <button
              onClick={handleAttachment}
              disabled={checkboxArr.length > 1 ? true : false}
            >
              View Attachment
            </button>
          )}
          <button onClick={handleReturn}>Return To Shop</button>
        </div>
      )}
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={toolTrack}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          onRowSelectionModelChange={handleCheckboxes}
          getRowClassName={(params) => {
            if (
              params.row.location == "shop" ||
              params.row.location == "Shop"
            ) {
              return "green";
            }
            if (dateCalculator(params.row.date, params.row.checkedOut)) {
              return "red-dot";
            }
            if (!dateCalculator(params.row.date, params.row.checkedOut)) {
              return "yellow-dot";
            }
          }}
        />
      </Paper>
    </section>
  );
}

export default HistoryTab;
