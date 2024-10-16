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
import TimeoutDrawer from "../drawers/timeoutDrawer";
import TimeoutInfo from "../drawers/timeoutInfo";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});

export default function WriteUpTable({ data, refreshData, loading }) {
  const [oldFiles, setOldFiles] = useState("");
  const [item, setItem] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [timeoutID, settimeoutID] = useState("");
  const [actionFlag, setActionFlag] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const handleActions = (id, objData) => {
    settimeoutID(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleEdit = (item) => {
    setItem(item);
    settimeoutID(item.id);
    setDrawer(true);
    setActionFlag(false);
  };
  const handleDelete = (data) => {
    setActionFlag(false);
    Swal.fire({
      icon: "error",
      text: "Are you sure you want to delete the Timeout data",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/timeout/${timeoutID}`)
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
    const handleApprove = (id) => {
        const data = {
            status:'Approved'
        }
        axios.patch(`${apiPath.prodPath}/api/timeout/changeStatus/${id}`, data)
            .then(res => {
                if (res.data.error) {
                    Swal.fire({
                        icon: 'error',
                        text:'Enable to change the status'
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        text:'Successfully updated'
                    })
                    refreshData()
                }
            })
            .catch(err => console.log(err))
    }
    const handleReject = (id) => {
        const data = {
            status:'Rejected'
        }
        axios.patch(`${apiPath.prodPath}/api/timeout/changeStatus/${id}`, data).then(res => {
            if (res.data.error) {
                    Swal.fire({
                        icon: 'error',
                        text:'Enable to change the status'
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        text:'Successfully updated'
                    })
                    refreshData()
                }
        }).catch(err=>console.log(err))
    }
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
                <TableCell style={{ minWidth: 100 }}>Date Added</TableCell>
                <TableCell style={{ minWidth: 150 }}>Added By</TableCell>
                <TableCell style={{ minWidth: 150 }}>Status</TableCell>
                <TableCell style={{ minWidth: 200 }}>Status Update</TableCell>
                <TableCell style={{ minWidth: 150 }}>Reason</TableCell>
                <TableCell style={{ minWidth: 100 }}>Start Date</TableCell>
                <TableCell style={{ minWidth: 100 }}>End Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Submit To Jamie</TableCell>
                <TableCell style={{ minWidth: 200 }}>Submit To Management</TableCell>
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
                        {actionFlag && i.id == timeoutID ? (
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
                          <TableCell style={{ minWidth: 150 }}>{i.dateAdded}</TableCell>
                          <TableCell style={{ minWidth: 150 }}>{i.user}</TableCell>
                <TableCell style={{ minWidth: 200 }}>{i.status}</TableCell>
                <TableCell style={{ minWidth: 200 }}><button onClick={()=>handleApprove(i.id)}>Approve</button><button onClick={()=>handleReject(i.id)}>Reject</button></TableCell>
                <TableCell style={{ minWidth: 150 }}>{i.reason}</TableCell>
                <TableCell style={{ minWidth: 150 }}>{i.startDate}</TableCell>
                <TableCell style={{ minWidth: 150 }}>{i.endDate}</TableCell>
                <TableCell style={{ minWidth: 150 }}>{i.jamieFlag ? "Yes" : "No"}</TableCell>
                          <TableCell style={{ minWidth: 200 }}>{i.managementFlag ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {drawer && timeoutID ? (
              <TimeoutDrawer
                refreshData={refreshData}
                open={drawer}
                data={item}
                onClose={handleCloseDrawer}
                editFlag={true}
                id={item.id}
              />
            ) : null}
            {infoModal ? (
              <TimeoutInfo
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
