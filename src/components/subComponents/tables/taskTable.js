import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import TaskInfo from "../drawers/taskInfoDrawer";
import Swal from "sweetalert2";
import TaskDrawer from "../drawers/taskDrawer";
import moment from "moment";
import "./table.scss";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function TaskTable({
  allTasks,
  loading,
  refreshData,
  loggedInUser,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();

  const handleActions = (id, objData) => {
    setTaskId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = () => {
    setActionFlag(false);
    setInfoModal(!infoModal);
  };
  const editTask = (data, id, assignedToUsers) => {
    axios
      .patch(`${apiPath.prodPath}/api/task/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
        if (data.taskStatus == "Completed") {
          console.log("#$#$#$#$#", data);
          console.log("assignedToUser", assignedToUsers);
          sendCompEmails(data, [...assignedToUsers]);
          sendAssignByCompEmails(data, [loggedInUser.email]);
        } else {
          sendUpdatedEmails(data, [...assignedToUsers]);
        }
      })
      .catch((err) => console.log(err));
  };
  const sendUpdatedEmails = (data, emails) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/updateTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emails, taskData: data }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const sendCompEmails = (data, emails) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/completeTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emails, taskData: data }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const sendAssignByCompEmails = (emails) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/assignByComplete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emails }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const deleteTasks = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Task data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/task/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedTasks =
    allTasks &&
    allTasks.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 200 }}>Last Updated</TableCell>
                <TableCell style={{ minWidth: 150 }}>Current Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Assigned To</TableCell>
                <TableCell style={{ minWidth: 150 }}>User</TableCell>
                <TableCell style={{ minWidth: 150 }}>Task Priority</TableCell>
                <TableCell style={{ minWidth: 150 }}>Task Category</TableCell>
                <TableCell style={{ minWidth: 120 }}>Task Status</TableCell>
                <TableCell style={{ minWidth: 120 }}>Due Date</TableCell>
                <TableCell style={{ minWidth: 120 }}>Module</TableCell>
                <TableCell style={{ minWidth: 150 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTasks.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Tasks Data Found</p>
                </TableRow>
              ) : (
                sortedTasks.map((i, index) => {
                  return (
                    <TableRow
                      key={i.id}
                      style={
                        index == 0
                          ? { background: "#ffd6d6" }
                          : { background: "#fff" }
                      }
                    >
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == taskId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={() => {
                                openInfoDrawer();
                                setActionFlag(false);
                              }}
                              className={poppins.className}
                            >
                              Open
                            </p>
                            <p
                              onClick={() => {
                                openEmpModal(i);
                                setActionFlag(false);
                              }}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => {
                                deleteTasks(i.id);
                                setActionFlag(false);
                              }}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {moment(i.lastUpdated).format("MM-DD-YYYY hh:mm a")}
                      </TableCell>
                      <TableCell>
                        {moment(i.currentDate).format("MM-DD-YYYY")}
                      </TableCell>
                      <TableCell>
                        {i.assignedTo &&
                          i.assignedTo.map((inner, ind) => {
                            return i.assignedTo.length - 1 == ind
                              ? `${inner.fullname}`
                              : `${inner.fullname},`;
                          })}
                      </TableCell>
                      <TableCell>{i.user}</TableCell>
                      <TableCell>{i.taskPriority}</TableCell>
                      <TableCell>{i.taskCategory}</TableCell>
                      <TableCell>{i.taskStatus}</TableCell>
                      <TableCell>
                        {moment(i.dueDate).format("MM-DD-YYYY")}
                      </TableCell>
                      <TableCell>
                        {i.selectedModule &&
                          i.selectedModule.map((inner, ind) => {
                            return i.selectedModule.length - 1 == ind
                              ? `${inner}`
                              : `${inner},`;
                          })}
                      </TableCell>
                      <TableCell>{i.description}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {openModal && editData ? (
              <TaskDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={taskId}
                data={editData}
                editTask={editTask}
              />
            ) : null}
            {infoModal ? (
              <TaskInfo
                open={infoModal}
                onClose={openInfoDrawer}
                item={item}
                refreshData={refreshData}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
