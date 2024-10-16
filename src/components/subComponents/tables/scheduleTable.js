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
import ScheduleModal from "../modal/scheduleModal";
import ScheduleDrawer from "../drawers/scheduleDrawer";

// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function ScheduleTable({ allUsers, refreshData, loading }) {
  const [actionFlag, setActionFlag] = useState(false);
  const [scheduleId, setScheduleId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [item, setItem] = useState("");
  const [scheduleModal, setScheduleModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const handleActions = (id, objData) => {
    setScheduleId(id);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
  };
  const scheduleModalHandler = (i) => {
    setItem(i);
    setScheduleModal(!scheduleModal);
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
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
                <TableCell style={{ minWidth: 150 }}>Employee Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Position</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 120 }}>Schedule</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Schedule Data Found</p>
                </TableRow>
              ) : (
                allUsers.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell>{i.fullname}</TableCell>
                      <TableCell>{i.position}</TableCell>
                      <TableCell>{i.email}</TableCell>
                      <TableCell>
                        {i.schedules && i.schedules.length ? (
                          <button onClick={() => scheduleModalHandler(i)}>
                            View Schedules
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setItem(i);
                              setDrawer(true);
                            }}
                          >
                            Set Schedule
                          </button>
                        )}
                      </TableCell>
                      {scheduleModal && i._id == item._id ? (
                        <ScheduleModal
                          open={scheduleModal}
                          handleClose={() => setScheduleModal(false)}
                          schedules={item.schedules}
                          userObj={{ label: item.fullname, value: item.id }}
                          refreshData={refreshData}
                        />
                      ) : null}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ScheduleDrawer
        open={drawer}
        onClose={handleCloseDrawer}
        refreshData={refreshData}
        userObj={{ label: item.fullname, value: item.id }}
      />
    </Paper>
  );
}

export default ScheduleTable;
