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
import ToolInfo from "../drawers/serviceToolsInfo";
import Swal from "sweetalert2";
import ServiceToolsDrawer from "../drawers/serviceToolsDrawer";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function EmployeeTable({ allTools, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [actionFlag, setActionFlag] = useState(false);
  const [toolId, setToolId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();

  const handleActions = (id, objData) => {
    setToolId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
    setActionFlag(false);
  };
  const openInfoDrawer = () => {
    setInfoModal(!infoModal);
    setActionFlag(false);
  };
  const editTool = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/serviceTools/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteTool = (id, fileObj) => {
    const file = JSON.stringify(fileObj);
    setActionFlag(false);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Tools data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${apiPath.prodPath}/api/serviceTools/${id}`, { file })
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedTools = allTools.sort((a, b) =>
    a.toolNumber.localeCompare(b.toolNumber)
  );
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
                  <TableCell style={{ minWidth: 80 }}>Tool#</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Picture</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Category</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Sub-Category</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Description</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Tech Assigned</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTools.length == 0 ? (
                  <TableRow>
                    <p className={poppins.className}>No Tools Data Found</p>
                  </TableRow>
                ) : (
                  sortedTools
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
                              alt="menu"
                            />
                            {actionFlag && i.id == toolId ? (
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
                                  onClick={() => deleteTool(i.id, i.picture)}
                                  className={poppins.className}
                                >
                                  Delete
                                </p>
                              </div>
                            ) : null}
                          </TableCell>
                          <TableCell>{i.toolNumber}</TableCell>
                          <TableCell>
                            <img
                              style={{ width: 40 }}
                              src={i.picture && i.picture.fileUrl}
                              className="tool-picture"
                              alt="No Image found"
                            />
                          </TableCell>
                          <TableCell>{i.category}</TableCell>
                          <TableCell>{i.subCategory}</TableCell>
                          <TableCell>{i.description}</TableCell>
                          <TableCell>{i.techAssigned}</TableCell>
                          <TableCell>{i.location}</TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
              {openModal && editData ? (
                <ServiceToolsDrawer
                  edit={true}
                  open={openModal}
                  onClose={() => openEmpModal()}
                  id={toolId}
                  data={editData}
                  editTool={editTool}
                />
              ) : null}
              {infoModal ? (
                <ToolInfo
                  open={infoModal}
                  onClose={openInfoDrawer}
                  item={item}
                  refreshData={refreshData}
                />
              ) : null}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20, 30, 40, 50]}
            component="div"
            count={sortedTools.length}
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
