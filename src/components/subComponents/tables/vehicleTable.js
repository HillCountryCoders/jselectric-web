import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import VehicleInfo from "../drawers/vehicleInfo";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
import VehicleDrawer from "../drawers/vehicleDrawer";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function VehicleTable({ allVehicles, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [vehicleId, setVehicleId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  const handleActions = (id, objData) => {
    setVehicleId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
  };

  const editVehicle = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/vehicles/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteVehicle = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the vehicles data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/vehicles/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedVehicles = allVehicles.sort(
    (a, b) => parseFloat(a.vehicleNo) - parseFloat(b.vehicleNo)
  );
  const openInfoDrawer = () => {
    setInfoModal(!infoModal);
    setActionFlag(false);
  };
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
                <TableCell style={{ minWidth: 150 }}>Vehicle #</TableCell>
                <TableCell style={{ minWidth: 150 }}>Driver/WEX Pin</TableCell>
                <TableCell style={{ minWidth: 150 }}>Inspection ID</TableCell>
                <TableCell style={{ minWidth: 150 }}>Vin #</TableCell>
                <TableCell style={{ minWidth: 120 }}>Status</TableCell>
                <TableCell style={{ minWidth: 120 }}>Tag Experation</TableCell>
                <TableCell style={{ minWidth: 120 }}>License Plate</TableCell>
                <TableCell style={{ minWidth: 120 }}>Make/Model</TableCell>
                <TableCell style={{ minWidth: 120 }}>Color</TableCell>
                <TableCell style={{ minWidth: 120 }}>Year</TableCell>
                <TableCell style={{ minWidth: 120 }}>Tx Tag</TableCell>
                <TableCell style={{ minWidth: 120 }}>Gas Card</TableCell>
                <TableCell style={{ minWidth: 120 }}>Gas Card Last</TableCell>
                <TableCell style={{ minWidth: 120 }}>Card #</TableCell>
                <TableCell style={{ minWidth: 120 }}>
                  Tracking Installed
                </TableCell>
                <TableCell style={{ minWidth: 120 }}>Geo Tab</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedVehicles.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Vehicles Data Found</p>
                </TableRow>
              ) : (
                sortedVehicles.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == vehicleId ? (
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
                              onClick={() => deleteVehicle(i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.vehicleNo}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.driverWEXPin}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.inspectionId}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.vinNo}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.status}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.tagExperation}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.licensePlate}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.makeModel}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>{i.color}</TableCell>
                      <TableCell style={{ minWidth: 120 }}>{i.year}</TableCell>
                      <TableCell style={{ minWidth: 120 }}>{i.txTag}</TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.gasCard}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.gasCardLast}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.cardNo}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.trackingInstalled}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.geoTab}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {openModal && editData ? (
              <VehicleDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={vehicleId}
                data={editData}
                editVehicle={editVehicle}
              />
            ) : null}
            {infoModal ? (
              <VehicleInfo
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
