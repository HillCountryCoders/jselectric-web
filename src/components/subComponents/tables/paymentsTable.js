import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
import DeviceDrawer from "../drawers/deviceDrawer";
import JobDrawer from "../drawers/jobDrawer";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function PaymentTable({ payments, handleEdit, handleDelete }) {
  useEffect(() => {
    console.log("inner", payments);
  }, []);
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ height: 350 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
              <TableCell style={{ minWidth: 150 }}>Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Payment Type</TableCell>
              <TableCell style={{ minWidth: 150 }}>Check#</TableCell>
              <TableCell style={{ minWidth: 150 }}>Notes</TableCell>
              <TableCell style={{ minWidth: 150 }}>Payment</TableCell>
              {/* <TableCell style={{ minWidth: 150 }}>Remaining Amount</TableCell> */}
              {/* <TableCell style={{ minWidth: 150 }}>Total Amount</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length == 0 ? (
              <TableRow>
                <p className={poppins.className}>No Data Found</p>
              </TableRow>
            ) : (
              payments.map((i) => {
                return (
                  <TableRow key={i.id}>
                    <TableCell>
                      <button onClick={() => handleEdit(i)}>Edit</button>
                      <button onClick={() => handleDelete(i)}>Delete</button>
                    </TableCell>
                    <TableCell style={{ minWidth: 150 }}>
                      {i.date == "" || i.date == undefined
                        ? ""
                        : moment(i.date).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell style={{ minWidth: 150 }}>
                      {i.paymentType == undefined || i.paymentType == ""
                        ? "None"
                        : i.paymentType}
                    </TableCell>
                    <TableCell style={{ minWidth: 150 }}>{i.checkNo}</TableCell>
                    <TableCell style={{ minWidth: 150 }}>
                      {i.note == undefined || i.note == "" ? "None" : i.note}
                    </TableCell>
                    <TableCell style={{ minWidth: 150 }}>
                      {i.payment == null
                        ? "none"
                        : `$${numberWithCommas(i.payment)}`}
                    </TableCell>
                    {/* <TableCell style={{ minWidth: 150 }}>
                      {i.remainingAmount == null
                        ? "none"
                        : `$${numberWithCommas(i.remainingAmount)}`}
                    </TableCell> */}
                    {/* <TableCell style={{ minWidth: 150 }}>
                      {i.amount == null
                        ? "none"
                        : `$${numberWithCommas(i.amount)}`}
                    </TableCell> */}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
