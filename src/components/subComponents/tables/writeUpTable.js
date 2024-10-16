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
import Swal from "sweetalert2";
import WriteUpDrawer from "../drawers/writeUpDrawer";
import WriteUpInfo from "../drawers/writeUpInfo";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
import SignatureModal from "../modal/signature";
export default function WriteUpTable({ data, refreshData, loading }) {
  const [oldFiles, setOldFiles] = useState("");
  const [item, setItem] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [writeUpId, setwriteUpId] = useState("");
  const [actionFlag, setActionFlag] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const handleActions = (id, objData) => {
    setwriteUpId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleEdit = (item) => {
    setItem(item);
    setwriteUpId(item.id);
    setDrawer(true);
    setActionFlag(false);
  };
  const handleDelete = (data) => {
    setActionFlag(false);
    Swal.fire({
      icon: "error",
      text: "Are you sure you want to delete the Write Up data",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/writeUp/${writeUpId}`)
          .then((res) => {
            if (res.data.error) {
              Swal.fire({ icon: "error", text: "Error Deleting Data" });
            } else {
              Swal.fire({ icon: "success", text: "Deleted Successfully" });
              refreshData();
            }
          });
      }
    });
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };
  const openInfoDrawer = () => {
    setInfoModal(!infoModal);
    setActionFlag(false);
  };
  const openSignatrueModal = (i) => {
    setItem(i);
    setwriteUpId(i.id);
    setSignatureModal(!signatureModal);
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
                <TableCell style={{ minWidth: 150 }}>Signature</TableCell>
                <TableCell style={{ minWidth: 150 }}>Date Created</TableCell>
                <TableCell style={{ minWidth: 150 }}>Created By</TableCell>
                <TableCell style={{ minWidth: 150 }}>Employee Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Date Added</TableCell>
                <TableCell style={{ minWidth: 150 }}>Warning</TableCell>
                <TableCell style={{ minWidth: 150 }}>Offences</TableCell>
                <TableCell style={{ minWidth: 150 }}>Other Offence</TableCell>
                <TableCell style={{ minWidth: 150 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Training Data found</p>
                </TableRow>
              ) : (
                data &&
                data.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                          alt="Menu"
                        />
                        {actionFlag && i.id == writeUpId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={openInfoDrawer}
                              className={poppins.className}
                            >
                              Open
                            </p>
                            <p
                              className={poppins.className}
                              onClick={() => handleEdit(i)}
                            >
                              Edit
                            </p>
                            <p
                              className={poppins.className}
                              onClick={() => handleDelete(i)}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        <button onClick={() => openSignatrueModal(i)}>
                          {i.signature == undefined
                            ? "Add"
                            : Object.keys(i.signature).length == 0
                            ? "Add"
                            : "View"}
                        </button>
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.dateCreated}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.createdBy}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.employeeName}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.dateAdded}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.typeOfWarning}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.typeOfOffences.length
                          ? i.typeOfOffences.map((inner, ind) => {
                              if (ind == i.typeOfOffences.length - 1) {
                                return `${inner}`;
                              } else {
                                return `${inner}, `;
                              }
                            })
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.otherOffence}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.description}
                      </TableCell>
                      {signatureModal && writeUpId == i.id ? (
                        <SignatureModal
                          moduleName="writeUp"
                          item={item}
                          handleClose={() => setSignatureModal(false)}
                          open={signatureModal}
                          refreshData={refreshData}
                        />
                      ) : null}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {drawer && writeUpId ? (
              <WriteUpDrawer
                refreshData={refreshData}
                open={drawer}
                data={item}
                onClose={handleCloseDrawer}
                editFlag={true}
                id={item.id}
              />
            ) : null}
            {infoModal ? (
              <WriteUpInfo
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
