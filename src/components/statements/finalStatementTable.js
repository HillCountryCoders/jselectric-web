import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment/moment";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function FinalStatementTable({ allInvoices }) {
  console.log(allInvoices);
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ height: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 80 }}>Invoice Date</TableCell>
              <TableCell style={{ minWidth: 80 }}>Job Id</TableCell>
              <TableCell style={{ minWidth: 80 }}>Invoice#</TableCell>
              <TableCell style={{ minWidth: 120 }}>Original Amount</TableCell>
              <TableCell style={{ minWidth: 120 }}>Retention Amount</TableCell>
              <TableCell style={{ minWidth: 170 }}>Remaining Amount</TableCell>
              <TableCell style={{ minWidth: 150 }}>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody style={{ background: "#fff" }}>
            {allInvoices.map((inner) => {
              return (
                <TableRow key={inner.id}>
                  <TableCell style={{ minWidth: 150 }}>
                    {moment(inner.invoiceDate).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>{inner.jobId}</TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    {inner.invoice}
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    {inner.originalAmount}
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    {inner.retentionAmount}
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    {inner.remainingAmount}
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>{inner.paid}</TableCell>
                </TableRow>
              );
            })}
          </TableBody> */}
        </Table>
      </TableContainer>
      {/* {allInvoices.map((i) => {
        return (
          <div key={i.id} className="payment-detaisl">
            <h1
              style={{
                marginTop: "20px",
                paddingTop: "10px",
                padding: "10px",
                fontWeight: "bold",
                borderTop: "1px solid #000",
              }}
            >
              Payments Details for Invoice # {i.invoice}
            </h1>
            <TableContainer sx={{ height: "auto" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ minWidth: 80 }}>Date</TableCell>
                    <TableCell style={{ minWidth: 80 }}>Cheque No</TableCell>
                    <TableCell style={{ minWidth: 120 }}>
                      Original Amount
                    </TableCell>
                    <TableCell style={{ minWidth: 120 }}>Payment</TableCell>
                    <TableCell style={{ minWidth: 170 }}>
                      Remaining Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ background: "#fff" }}>
                  {i.payments
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((inner) => {
                      return (
                        <TableRow key={inner.id}>
                          <TableCell style={{ minWidth: 150 }}>
                            {moment(inner.date).format("MM/DD/YYYY")}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {inner.checkNo}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {inner.amount}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {inner.payment}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {inner.remainingAmount}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      })} */}
    </Paper>
  );
}
