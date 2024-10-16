import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./table.scss";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import PurchaseOrdersDrawer from "../drawers/purchaseOrdersDrawer";
import PurchaseOrderInfo from "../drawers/purchaseInfo";
import Image from "next/image";

function PurchaseOrderTable({ purchaseOrders, refreshData }) {
  const [openFlag, setOpenFlag] = useState(false);
  const [editData, setEditData] = useState("");
  const [infoModal, setInfoModal] = useState(false);
  const [actionFlag, setActionFlag] = useState(false);
  const [purchaseOrderId, setPurchaseOrderId] = useState(false);
  const [item, setItem] = useState("");
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenFlag(!openFlag);
    setActionFlag(false);
  };
  const handleActions = (id, objData) => {
    setPurchaseOrderId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const deleteNeedTag = (idObj) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/purchaseOrder/${idObj}`)
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Unable to delete",
              });
            }
            if (res.data.error == false) {
              Swal.fire({
                icon: "success",
                text: "Deleted Successfully",
              });
              refreshData();
              setActionFlag(false);
            }
          });
      }
    });
  };
  const openInfoDrawer = () => {
    setActionFlag(false);
    setInfoModal(!infoModal);
  };
  return (
    <section>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 120 }}>Actions</TableCell>
              <TableCell style={{ minWidth: 120 }}>PO</TableCell>
              <TableCell style={{ minWidth: 120 }}>Purchase Type</TableCell>
              <TableCell style={{ minWidth: 120 }}>Vendor</TableCell>
              <TableCell style={{ minWidth: 120 }}>Vendor Sales</TableCell>
              <TableCell style={{ minWidth: 120 }}>Purchase Status</TableCell>
              <TableCell style={{ minWidth: 120 }}>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrders.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {/* <TableCell>
                    <div className="action-wrap">
                      <span
                        onClick={() => {
                          deleteNeedTag(row.id);
                        }}
                      >
                        &#10005;
                      </span>
                      <span
                        onClick={() => {
                          openEmpModal(row);
                        }}
                      >
                        &#9998;
                      </span>
                    </div>
                  </TableCell> */}
                  <TableCell style={{ position: "relative" }}>
                    <Image
                      onClick={() => handleActions(row.id, row)}
                      src="/dots.png"
                      width={32}
                      height={32}
                    />
                    {actionFlag && row.id == purchaseOrderId ? (
                      <div className="dropdown-div">
                        <p
                          onClick={openInfoDrawer}
                          className={poppins.className}
                        >
                          Open
                        </p>
                        <p
                          onClick={() => openEmpModal(row)}
                          className={poppins.className}
                        >
                          Edit
                        </p>
                        <p
                          onClick={() => deleteNeedTag(row.id)}
                          className={poppins.className}
                        >
                          Delete
                        </p>
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell>{row.PO}</TableCell>
                  <TableCell>{row.purchaseType}</TableCell>
                  <TableCell>{row.vendor}</TableCell>
                  <TableCell>{row.vendorSales}</TableCell>
                  <TableCell>{row.purchaseStatus}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                  {infoModal && row.id == purchaseOrderId ? (
                    <PurchaseOrderInfo
                      open={infoModal}
                      onClose={openInfoDrawer}
                      item={item}
                      refreshData={refreshData}
                    />
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PurchaseOrdersDrawer
        open={openFlag}
        onClose={() => setOpenFlag(!openFlag)}
        refreshData={refreshData}
        edit={true}
        editData={editData}
        id={editData.id}
      />
    </section>
  );
}

export default PurchaseOrderTable;
