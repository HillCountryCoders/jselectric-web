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
import EmployeeDrawer from "../drawers/employeeDrawer";
import EmployeeInfo from "../drawers/employeeInfo";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function EmployeeTable({ allUsers, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [empId, setEmpId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();

  const handleActions = (id, objData) => {
    setEmpId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    if (openModal) {
      refreshData();
    }
    setOpenModal(!openModal);
    setActionFlag(false);
  };
  const openInfoDrawer = () => {
    setActionFlag(false);
    setInfoModal(!infoModal);
  };
  const editEmp = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/users/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteEmp = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the employee data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/users/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedUser = allUsers.sort((a, b) =>
    a.fullname.localeCompare(b.fullname)
  );
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
                <TableCell style={{ minWidth: 150 }}>User Status</TableCell>
                <TableCell style={{ minWidth: 150 }}>Full name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Position</TableCell>
                <TableCell style={{ minWidth: 150 }}>Personal Phone</TableCell>
                <TableCell style={{ minWidth: 150 }}>Company Phone</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 150 }}>Vehicle</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tablet</TableCell>
                <TableCell style={{ minWidth: 150 }}>Primary Address</TableCell>
                <TableCell style={{ minWidth: 150 }}>City</TableCell>
                <TableCell style={{ minWidth: 150 }}>State</TableCell>
                <TableCell style={{ minWidth: 150 }}>Zipcode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUser.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Employee Data Found</p>
                </TableRow>
              ) : (
                sortedUser.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == empId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={openInfoDrawer}
                              className={poppins.className}
                            >
                              Open
                            </p>
                            <p
                              onClick={() => openEmpModal({ ...i })}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => deleteEmp(i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell>{i.userStatus}</TableCell>
                      <TableCell>{i.fullname}</TableCell>
                      <TableCell>{i.position}</TableCell>
                      <TableCell>{i.personalPhone}</TableCell>
                      <TableCell>{i.companyPhone}</TableCell>
                      <TableCell>{i.email}</TableCell>
                      <TableCell>{i.vehicle}</TableCell>
                      <TableCell>{i.tablet}</TableCell>
                      <TableCell>
                        {i.primaryAddress == undefined
                          ? "N/A"
                          : i.primaryAddress}
                      </TableCell>
                      <TableCell>{i.city}</TableCell>
                      <TableCell>
                        {i.state == undefined ? "N/A" : i.state}
                      </TableCell>
                      <TableCell>
                        {i.zipcode == undefined ? "N/A" : i.zipcode}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {openModal && editData ? (
              <EmployeeDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={empId}
                data={editData}
                editEmp={editEmp}
              />
            ) : null}
            {infoModal ? (
              <EmployeeInfo
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
