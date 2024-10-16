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
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
import DeviceDrawer from "../drawers/deviceDrawer";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function DeviceTable({ allDevices, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();

  const handleActions = (id, objData) => {
    setDeviceId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = () => {
    if (infoModal) {
      setActionFlag(false);
    }
    setInfoModal(!infoModal);
  };
  const editDevice = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/devices/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteDevices = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the devices data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/devices/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedDevices = allDevices.sort((a, b) =>
    a.category.localeCompare(b.category)
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
                <TableCell style={{ minWidth: 150 }}>Category</TableCell>
                <TableCell style={{ minWidth: 150 }}>Billing Account</TableCell>
                <TableCell style={{ minWidth: 150 }}>Phone No</TableCell>
                <TableCell style={{ minWidth: 120 }}>Username</TableCell>
                <TableCell style={{ minWidth: 120 }}>Make/Model</TableCell>
                <TableCell style={{ minWidth: 120 }}>Upgrade Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Usage Last Month
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDevices.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Devices Data Found</p>
                </TableRow>
              ) : (
                sortedDevices.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == deviceId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={() => openEmpModal({ ...i })}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => deleteDevices(i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell>{i.category}</TableCell>
                      <TableCell>{i.billingAccount}</TableCell>
                      <TableCell>{i.phoneNo}</TableCell>
                      <TableCell>{i.username}</TableCell>
                      <TableCell>{i.make}</TableCell>
                      <TableCell>{i.upgradeDate}</TableCell>
                      <TableCell>{i.usageLastMonth}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {openModal && editData ? (
              <DeviceDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={deviceId}
                data={editData}
                editDevice={editDevice}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
