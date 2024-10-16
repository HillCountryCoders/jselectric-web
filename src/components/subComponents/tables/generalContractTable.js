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
import GeneralContractDrawer from "../drawers/generalContractDrawer";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function GeneralContractTable({
  allGeneralContracts,
  loading,
  refreshData,
}) {
  const [actionFlag, setActionFlag] = useState(false);
  const [generalContractId, setGeneralContractId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleActions = (id) => {
    setGeneralContractId(id);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setActionFlag(false);
    setEditData(data);
    setOpenModal(!openModal);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteJob = (id) => {
    setActionFlag(!actionFlag);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/generalContract/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <>
          <TableContainer sx={{ height: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Company Name</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Contact</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Address</TableCell>
                  <TableCell style={{ minWidth: 150 }}>City</TableCell>
                  <TableCell style={{ minWidth: 150 }}>State</TableCell>
                  <TableCell style={{ minWidth: 150 }}>ZipCode</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Phone</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Website</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allGeneralContracts.length == 0 ? (
                  <TableRow>
                    <p className={poppins.className}>No Data Found</p>
                  </TableRow>
                ) : (
                  allGeneralContracts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((i) => {
                      return (
                        <TableRow key={i.id}>
                          <TableCell style={{ position: "relative" }}>
                            <Image
                              onClick={() => handleActions(i.id, i)}
                              src="/dots.png"
                              width={32}
                              height={32}
                            />
                            {actionFlag && i.id == generalContractId ? (
                              <div className="dropdown-div">
                                <p
                                  onClick={() => openEmpModal({ ...i })}
                                  className={poppins.className}
                                >
                                  Edit
                                </p>
                                <p
                                  onClick={() => deleteJob(i.id)}
                                  className={poppins.className}
                                >
                                  Delete
                                </p>
                              </div>
                            ) : null}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.companyName}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.contact}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.address}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.city}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.state}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.zipCode}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.phone}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.email}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.website}
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
              {openModal && editData ? (
                <GeneralContractDrawer
                  edit={true}
                  open={openModal}
                  onClose={() => openEmpModal()}
                  id={generalContractId}
                  editData={editData}
                  refreshData={refreshData}
                />
              ) : null}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20, 30, 40, 50]}
            component="div"
            count={allGeneralContracts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
