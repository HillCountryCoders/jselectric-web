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
import TrackingDrawer from "../drawers/trackingDrawer";
import moment from "moment/moment";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function TrackingTable({ allTracking, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [trackingId, settrackingId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();

  const handleActions = (id, objData) => {
    settrackingId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setActionFlag(false);
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = () => {
    if (infoModal) {
      setActionFlag(false);
    }
    setInfoModal(!infoModal);
  };
  const editTracking = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/tracking/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteTracking = (id) => {
    setActionFlag(!actionFlag);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Tracking data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/tracking/${id}`)
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
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Number</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Location</TableCell>
                <TableCell style={{ minWidth: 150 }}>Date Ordered</TableCell>
                <TableCell style={{ minWidth: 150 }}>Supplier</TableCell>
                <TableCell style={{ minWidth: 150 }}>Rep</TableCell>
                <TableCell style={{ minWidth: 150 }}>Contact</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Item Description
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>Price</TableCell>
                <TableCell style={{ minWidth: 150 }}>Qty Ordered</TableCell>
                <TableCell style={{ minWidth: 150 }}>Qty Received</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Est Shipped Date
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>Shipped Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Received Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Receiver</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Location Storage Id
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Location Building
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Date Sent To Job Site
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>Shipping Cost</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Back Order Shipping Qty
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Back Order Shipping
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>Total Shipping</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Pre Tax Material Cost
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTracking.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Jobs Data Found</p>
                </TableRow>
              ) : (
                allTracking.map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == trackingId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={() => openEmpModal({ ...i })}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => deleteTracking(i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.jobNumber}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.jobName}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.location}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {moment(i.dateOrdered).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.supplier}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.rep}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.contact}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.email}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.itemDescription}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.price}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.qtyOrdered}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.qtyReceived}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {moment(i.estShippedDate).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {moment(i.shippedDate).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {moment(i.receivedDate).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.receiver}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.currentLocationStorageId}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.currentLocationBuilding}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {moment(i.dateSentToJobSite).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.shippingCost}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.backOrderShippingQty}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.backOrderShipping}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.totalShipping}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.preTaxMaterialCost}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.totalCost}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {openModal && editData ? (
              <TrackingDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={trackingId}
                data={editData}
                editTracking={editTracking}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
